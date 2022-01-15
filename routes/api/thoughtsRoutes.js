const router = require('express').Router();
const {
    getAllThoughts,
    addThought,
} = require('../../controller/thoughtsController');

router.route('/').get(getAllThoughts).post(addThought)

module.exports = router;