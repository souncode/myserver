const router = require('express').Router();

const ProjectController = require('../controller/project.controller');

router.post('/addproject', ProjectController.addProject);
router.post('/getproject', ProjectController.getProject);

module.exports = router;