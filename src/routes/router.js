const express = require("express");
const router = express.Router();

// log requests
router.use("*", (req, res, next) => {
  console.log(`[${req.method}] - ${req.baseUrl}`);
  next();
});

// add single router files
router.use(`/health`, require(`./health`));
router.use(`/cryptocurrencies`, require(`./cryptocurrencies`));

module.exports = router;
