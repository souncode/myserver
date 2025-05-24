const UserModel = require('../model/user.model');
const mongoose = require('mongoose');
class UserService {
    static async registerUser(name, pass) {
        try {
            const addUser = new UserModel({ name, pass});
            return await addUser.save();
        } catch (error) {
            throw error
        }
    }

    static async getUserData() {
        try {
            const UserData = await UserModel.find({});
            return UserData;
        } catch (error) {
            throw error;
        }
    }

}
module.exports = UserService;