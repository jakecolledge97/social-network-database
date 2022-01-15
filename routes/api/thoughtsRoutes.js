const router = require('express').Router();
const {
    getAllThoughts,
    getThoughtById,
    addThought,
} = require('../../controller/thoughtsController');

router.route('/').get(getAllThoughts).post(addThought);

router.route('/:thoughtsId').get(getThoughtById);

module.exports = router;