const router = require('express').Router();
const productRoutes = require('./product');
const authRoutes = require("./auth");
const userRoutes = require("./user");
const categoryRoutes = require('./category');
const stripeRoutes = require("./stripe");
const orderRoutes = require("./order");
const emailRoutes = require("./email");
const OrderEmailRoutes = require("./OrderEmail");
const complaintRoutes = require("./complaint");
const ComplaintEmailRoutes = require("./ComplaintEmail");
const dialogFlowRoutes = require('./dialogflow');


router.use('/products', productRoutes);
router.use('/user', userRoutes);
router.use("/auth", authRoutes);
router.use("/checkout", stripeRoutes);

router.use("/orders", orderRoutes);
router.use('/category', categoryRoutes);
router.use('/email', emailRoutes);
router.use('/OrderEmail', OrderEmailRoutes);
router.use('/complaint', complaintRoutes);
router.use('/ComplaintEmail', ComplaintEmailRoutes);
router.use('/api/dialogflow', dialogFlowRoutes);



/* GET home page. */
router.get('/', function(req, res, next) {
  res.end('Hello World');
});

module.exports = router;
