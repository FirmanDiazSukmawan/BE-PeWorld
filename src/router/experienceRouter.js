const express = require("express");
const router = express.Router();
const {
  getExperience,
  getExperienceById,
  getExperienceByWorkersId,
  createdExperience,
  updatedExperience,
  deletedExperience,
} = require("../controller/experienceController");
const {
  isRecruiter,
  isWorkers,
  LoginAuth,
} = require("../middleware/verifyRole");
const upload = require("../middleware/multer");

router.get("/", LoginAuth, getExperience);
router.get("/:experience_id", getExperienceById);
router.get("/users/:workers_id", getExperienceByWorkersId);
router.post("/", createdExperience);
router.put("/:experience_id", upload, updatedExperience);
router.delete("/:experience_id", deletedExperience);

module.exports = router;
