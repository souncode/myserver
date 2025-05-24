const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const ImageDataModel = require('../model/imagedata.model');
const THUMBNAIL_DIR_NAME = 'thumbnails';
const sharp = require('sharp');

const router = express.Router();

const BASE_UPLOAD_DIR = path.join(__dirname, '..', 'uploads');


// --- Multer storage setup ---
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folder = req.query.folder || 'default';
    const targetDir = path.join(BASE_UPLOAD_DIR, folder + '/images');

    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    cb(null, targetDir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage });

router.post('/uploads', upload.array('images'), async (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ message: 'No files uploaded' });
  }
//thumb
 const project = req.query.project
  const folder = req.query.folder || 'default';
  const protocol = req.protocol;
  const host = req.headers.host;
  const thumbDir = path.join(BASE_UPLOAD_DIR, folder, THUMBNAIL_DIR_NAME);
  if (!fs.existsSync(thumbDir)) {
    fs.mkdirSync(thumbDir, { recursive: true });
  }

  try {
    const savedImages = await Promise.all(req.files.map(async (file) => {
      const fullImageUrl = `${protocol}://${host}/uploads/${folder}/images/${file.filename}`;
      const thumbFilename = `thumb_${file.filename}`;
      const thumbPath = path.join(thumbDir, thumbFilename);
      const thumbUrl = `${protocol}://${host}/uploads/${folder}/${THUMBNAIL_DIR_NAME}/${thumbFilename}`;

      // Tạo thumbnail bằng sharp
      await sharp(file.path)
        .resize({ width: 300 }) // Resize width 300px (hoặc theo nhu cầu)
        .toFile(thumbPath);
      const imageData = new ImageDataModel({
        proj:project,
        name: file.originalname,
        folder,
        url: fullImageUrl,
        thumbUrl,
        size: file.size,
        boundingBoxes: []
      });
console.error('Projectname:', project);
      return await imageData.save();
    }));

    res.json({
      message: `Files uploaded to folder '${folder}' and saved to database`,
      files: savedImages,
    });
  } catch (err) {
    console.error('Error saving image data to DB:', err);
    res.status(500).json({ error: 'Failed to save image data to database' });
  }
});

// --- Lấy danh sách ảnh ---
router.get('/uploads/list', async (req, res) => {
  const folder = req.query.folder || 'default';

  try {
    const images = await ImageDataModel.find({ folder }).sort({ createdAt: -1 });

    res.json(images.map(image => ({
       proj:image.project,
      id: image._id,
      name: image.name,
      url: image.url,
      thumbUrl: image.thumbUrl,
      size: image.size,
      createdAt: image.createdAt,
      labelUrl: image.labelUrl,
      boundingBoxes: image.boundingBoxes
    })));

  } catch (err) {
    console.error('Error fetching image list from DB:', err);
    res.status(500).json({ error: 'Failed to fetch image list' });
  }
});


router.post('/uploads/label', async (req, res) => {
  const { name, folder, yoloContent, boundingBoxes } = req.body;

  if (!name || !folder || !yoloContent) {
    return res.status(400).json({ message: 'Missing parameters' });
  }

  try {
    const baseName = path.parse(name).name;
    const labelFilename = `${baseName}.txt`;

    const labelDir = path.join(BASE_UPLOAD_DIR, folder + "/labels");
    if (!fs.existsSync(labelDir)) {
      fs.mkdirSync(labelDir, { recursive: true });
    }

    const labelPath = path.join(labelDir, labelFilename);
    const labelUrl = `http://soun.mooo.com:3000/uploads/${folder}/labels/${labelFilename}`;

    fs.writeFileSync(labelPath, yoloContent);

    await ImageDataModel.updateOne(
      { name, folder },
      { $set: { labelUrl, boundingBoxes: boundingBoxes || [], } },
      { upsert: true }
    );

    res.json({ message: 'Label saved', labelUrl });
  } catch (error) {
    console.error('Error saving label:', error);
    res.status(500).json({ message: 'Failed to save label' });
  }
});

router.delete('/uploads', async (req, res) => {
  const { folder, filename } = req.query;

  if (!folder || !filename) {
    return res.status(400).json({ message: 'Missing folder or filename' });
  }

  try {
    // Đường dẫn ảnh
    const imagePath = path.join(BASE_UPLOAD_DIR, folder, 'images', filename);
     const thumbPath = path.join(BASE_UPLOAD_DIR, folder, 'thumbnails', 'thumb_'+filename);

    // Xoá ảnh nếu tồn tại
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
      console.log(`🗑️ Deleted image: ${imagePath}`);
    } else {
      console.warn(`⚠️ Image not found: ${imagePath}`);
    }
     if (fs.existsSync(thumbPath)) {
      fs.unlinkSync(thumbPath);
      console.log(`🗑️ Deleted image: ${thumbPath}`);
    } else {
      console.warn(`⚠️ Image not found: ${thumbPath}`);
    }


    // Đường dẫn file label tương ứng
    const baseName = path.parse(filename).name;
    const labelPath = path.join(BASE_UPLOAD_DIR, folder, 'labels', `${baseName}.txt`);

    // Xoá label nếu tồn tại
    if (fs.existsSync(labelPath)) {
      fs.unlinkSync(labelPath);
      console.log(`🗑️ Deleted label: ${labelPath}`);
    } else {
      console.warn(`⚠️ Label not found: ${labelPath}`);
    }

    // Xoá khỏi MongoDB
    await ImageDataModel.deleteOne({ name: filename, folder });
    console.log(`🗑️ Deleted record in DB for: ${filename}`);

    res.json({ message: `Deleted ${filename} and its label in folder ${folder}` });
  } catch (err) {
    console.error('❌ Error deleting image and label:', err);
    res.status(500).json({ message: 'Failed to delete image and label' });
  }
});


module.exports = router;
