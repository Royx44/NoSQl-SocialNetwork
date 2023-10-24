const router = require('express').Router();

const {
    fetchThoughts,
    fetchSingleThought,
    createNewThought,
    removeThought,
    modifyThought,
    
} = require('../../controllers/thoughtController');

// Handle routes for thoughts
router.route('/thoughts')
    .get(fetchThoughts)
    .post(createNewThought);

// Handle routes for a single thought by ID
router.route('/thoughts/:thoughtId')
    .get(fetchSingleThought)
    .put(modifyThought)
    .delete(removeThought);

module.exports = router;
