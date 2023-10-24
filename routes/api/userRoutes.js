const router = require('express').Router();

const {
    fetchUsers,
    fetchSingleUser,
    createNewUser,
    removeUser,
    modifyUser,

} = require('../../controllers/userController');

// Handle routes for users
router.route('/users')
    .get(fetchUsers)
    .post(createNewUser);

// Handle routes for a single user by ID
router.route('/users/:userid')
    .get(fetchSingleUser)
    .delete(removeUser)
    .put(modifyUser);

module.exports = router;
