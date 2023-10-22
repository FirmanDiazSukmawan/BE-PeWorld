const express = require("express");
const router = express.Router();
const {
  getSkills,
  getSkillsById,
  getSkillsByWorkersId,
  createdSkills,
  updateSkill,
  deleteSkill,
} = require("../controller/skillsController");
const {
  isRecruiter,
  isWorkers,
  LoginAuth,
} = require("../middleware/verifyRole");

router.get("/", LoginAuth, getSkills);
router.get("/:skills_id", getSkillsById);
router.get("/users/:workers_id", getSkillsByWorkersId);
router.post("/", createdSkills);
router.put("/:skills_id", updateSkill);
router.delete("/:skills_id", deleteSkill);

module.exports = router;
