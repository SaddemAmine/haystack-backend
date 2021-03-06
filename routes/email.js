const emailController = require('../controllers/email');
const express = require("express");
const router = express.Router();


router.route('/send/:id').get(emailController.send)
router.route('/verify/:id').get(emailController.verify)
router.route('/reset-password').post(emailController.resetPassword)


module.exports = router;
