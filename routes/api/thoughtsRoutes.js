const router = require('express').Router();
const {
    getAllThoughts,
    getThoughtById,
    addThought,
    changeThoughtById,
    createReaction,
} = require('../../controller/thoughtsController');

router.route('/').get(getAllThoughts).post(addThought);

router.route('/:thoughtsId').get(getThoughtById).put(changeThoughtById);

router.route('/:thoughtsId/reactions').post(createReaction)

module.exports = router;