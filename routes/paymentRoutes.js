const router = require("express").Router();
const { createOrder, verifyPayment } = require("../controllers/paymentController");

router.post("/orders", createOrder);
router.post("/verify", verifyPayment);

module.exports = router;
