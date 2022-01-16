const router = require('express').Router();
const {
    getAllThoughts,
    getThoughtById,
    addThought,
    changeThoughtById,
    createReaction,
    deleteThought,
    removeReaction,
} = require('../../controller/thoughtsController');

router.route('/').get(getAllThoughts).post(addThought);

router.route('/:thoughtsId').get(getThoughtById).put(changeThoughtById).delete(deleteThought);

router.route('/:thoughtsId/reactions').post(createReaction).delete(removeReaction)

module.exports = router;