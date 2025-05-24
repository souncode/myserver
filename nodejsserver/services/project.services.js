const ProjectModel = require('../model/project.model');
class ProjectService {
    static async registerProject(user, name, type, time, classes) {
        try {
            const addProject = new ProjectModel({ user, name, type, time, classes });
            return await addProject.save();
        } catch (error) {
            throw error
        }
    }

    static async getProject(user) {
        try {
            const ProjectData = await ProjectModel.find({ user: user });
            return ProjectData;
        } catch (error) {
            throw error;
        }
    }

}
module.exports = ProjectService;