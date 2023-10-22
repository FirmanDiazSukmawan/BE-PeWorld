const express = require("express");
const router = express.Router();

const workersRouter = require("./workersRouter");
const recruiterRouter = require("./recruiterRouter");
const portofolioRouter = require("./portofolioRouter");
const experienceRouter = require("./experienceRouter");
const skillsRouter = require("./skillsRouter");
const hireRouter = require("./hireRouter");

router.use("/workers", workersRouter);
router.use("/recruiters", recruiterRouter);
router.use("/portofolio", portofolioRouter);
router.use("/experience", experienceRouter);
router.use("/skills", skillsRouter);
router.use("/hire", hireRouter);

module.exports = router;
