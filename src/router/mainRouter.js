const express = require("express");
const router = express.Router();

const workersRouter = require("./workersRouter");
const recruiterRouter = require("./recruiterRouter");

router.use("/workers", workersRouter);
router.use("/recruiters", recruiterRouter);

module.exports = router;
