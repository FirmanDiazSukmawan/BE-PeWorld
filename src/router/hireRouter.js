const express = require("express");
const router = express.Router();
const {
  getHire,
  getHireById,
  getHireByWorkersId,
  getHireByRecruiterId,
  createdHire,
  updatedHire,
  deletedHire,
} = require("../controller/hireController");
const {
  isRecruiter,
  isWorkers,
  LoginAuth,
} = require("../middleware/verifyRole");

router.get("/", LoginAuth, getHire);
router.get("/:hire_id", getHireById);
router.get("/users/:workers_id", getHireByWorkersId);
router.get("/users/:recruiter_id", getHireByRecruiterId);
router.post("/", createdHire);
router.put("/:hire_id", updatedHire);
router.delete("/:hire_id", deletedHire);

module.exports = router;
