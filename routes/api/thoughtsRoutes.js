const router = require('express').Router();
const {
    getAllThoughts,
    getThoughtById,
    addThought,
    changeThoughtById,
    createReaction,
    deleteThought,
} = require('../../controller/thoughtsController');

router.route('/').get(getAllThoughts).post(addThought);

router.route('/:thoughtsId').get(getThoughtById).put(changeThoughtById).delete(deleteThought);

router.route('/:thoughtsId/reactions').post(createReaction)

module.exports = router;