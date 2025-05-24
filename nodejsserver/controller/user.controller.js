const UserService = require("../services/user.services");

exports.addUser = async (req, res, next) => {

    try {
        const { name, pass } = req.body;
        const successRes = await UserService.registerUser(name, pass);
        res.json({ status: true, success: "User Registered Successfully :" + successRes })
    } catch (error) {
        throw error
    }
}
exports.getUser = async (req, res, next) => {

    try {
        let line = await UserService.getLineData();
        res.json({ status: true, success: line })
    } catch (error) {
        throw error
    }
}
