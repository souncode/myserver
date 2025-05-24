const ProjectService = require("../services/project.services");

exports.addProject = async (req, res, next) => {
    try {
        const { user, name, type, time, classes } = req.body;
        const successRes = await ProjectService.registerProject(user, name, type, time, classes);
        res.json({ successRes })
    } catch (error) {
        throw error
    }
}
exports.getProject = async (req, res, next) => {
    try {
        const { user } = req.body;
        const successRes = await ProjectService.getProject(user);
        res.json({ successRes })
    } catch (error) {
        throw error
    }
}

