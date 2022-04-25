const OrderEmailController = require('../controllers/OrderEmail');
const express = require("express");
const router = express.Router();


router.route('/send/:id').get(OrderEmailController.send)


module.exports = router;
