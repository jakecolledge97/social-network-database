const router = require('express').Router();
const {
    getUsers,
    createUser,
    getUserById,
    updateUserById,
    addFriend,
} = require('../../controller/userController')

router.route('/').get(getUsers).post(createUser)

router.route('/:userId').get(getUserById).put(updateUserById)

router.route('/:userId/friends/:friendId').post(addFriend)

module.exports = router;