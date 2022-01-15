const router = require('express').Router();
const {
    getAllThoughts,
    getThoughtById,
    addThought,
    changeThoughtById,
} = require('../../controller/thoughtsController');

router.route('/').get(getAllThoughts).post(addThought);

router.route('/:thoughtsId').get(getThoughtById).put(changeThoughtById);

module.exports = router;