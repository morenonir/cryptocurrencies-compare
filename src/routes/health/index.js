  const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  return res.status(200).send(`Server is running`);
});

module.exports = router;