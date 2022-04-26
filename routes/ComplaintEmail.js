const express = require("express");
const ComplaintEmailController = require("../controllers/ComplaintEmail");
const router = express.Router();


router.route('/send/:id').get(ComplaintEmailController.send)


module.exports = router;
