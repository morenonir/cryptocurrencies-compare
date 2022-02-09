const express = require("express");
const router = express.Router();
const getPriceOverTime = require('./controller');

router.get("/priceOverTime", getPriceOverTime);

module.exports = router;