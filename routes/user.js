const express = require('express');
const productController = require('../controllers/product');
const userController = require('../controllers/user');
const passport = require("passport");
const router = express.Router();


router.route('/')
    .get(userController.getUsers)

router.route('/:id')
    .get(userController.getUser)
    .put(userController.updateUser)
    .delete(userController.deleteUser);

router.route('/email/:email')
    .get(userController.getUserByEmail)
    .delete(userController.deleteUser)

router.route('/changePassword/:id')
    .post(userController.changePassword)

router.route('/follow')
    .post(userController.followUser)

router.route('/unfollow')
    .post(userController.unfollowUser)

router.route('/:id/following/:followerId')
    .get(userController.checkFollowing)


module.exports = router;
