const res = require("express/lib/response");
const { User } = require("../models")

module.exports = {
    //get ALL users
    getUsers(req, res){
        User.find()
        .then(async(users) => {
            const userObj = {
                users
            };
            return res.json(userObj);
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).json(err)
        })
    }
}
