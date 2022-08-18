const router = require('express').Router();
// basically calling the variable
const {
    getUser,
    getSingleUser,
    createUser,
    deleteUser,
    updateUser
} = require('../../controllers/userController');
// /api/user
router.route('/').get(getUser).post(createUser);

// /api/user/:userId

router
    .route('/:courseId')
    .get(getSingleUser)
    .put(updateUser)
    .delete(deleteUser);

module.exports = router;
