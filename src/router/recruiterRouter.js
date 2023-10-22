const express = require("express");
const router = express.Router();
const {
  getRecruiter,
  getRecruiterById,
  createRecruiters,
  loginRecruiters,
  updateRecruiters,
  deleteRecruiters,
} = require("../controller/recruiterController");
const { isAdmin, isUser, LoginAuth } = require("../middleware/verifyRole");
const upload = require("../middleware/multer");

router.get("/", LoginAuth, getRecruiter);
router.get("/:recruiter_id", getRecruiterById);
router.post("/login", loginRecruiters);
router.post("/", createRecruiters);
router.put("/:recruiter_id", upload, updateRecruiters);
router.delete("/:recruiter_id", deleteRecruiters);

module.exports = router;
