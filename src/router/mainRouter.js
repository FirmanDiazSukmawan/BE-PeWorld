const express = require("express");
const router = express.Router();

const workersRouter = require("./workersRouter");

router.use("/workers", workersRouter);

module.exports = router;
