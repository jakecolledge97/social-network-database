const router = require('express').Router();
const {
    getUsers,
    createUser,
} = require('../../controller/userController')

router.route('/').get(getUsers).post(createUser)

module.exports = router;