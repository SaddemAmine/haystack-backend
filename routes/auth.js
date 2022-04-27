const passport = require("passport");
const router = require("express").Router();
const userController = require("../controllers/user");


router.route('/login')
    .post( userController.login)
router.route('/google/login')
    .post( userController.googleLogin)
router.route('/register')
    .post( userController.createUser)

module.exports = router
