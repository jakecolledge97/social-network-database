const router = require('express').Router();
const {
    getUsers,
    createUser,
    getUserById,
    updateUserById,
    addFriend,
    deleteFriend,
} = require('../../controller/userController')

router.route('/').get(getUsers).post(createUser)

router.route('/:userId').get(getUserById).put(updateUserById)

router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend)

module.exports = router;