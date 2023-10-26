const express = require("express");
const router = express.Router();
const {
  getWorkers,
  getWorkerById,
  createWorker,
  loginWorker,
  updateWorker,
  updateSkillsWorkers,
  deleteWorker,
} = require("../controller/workersController");
const {
  isRecruiter,
  isWorkers,
  LoginAuth,
} = require("../middleware/verifyRole");
const upload = require("../middleware/multer");

router.get("/", getWorkers);
router.get("/:workers_id", getWorkerById);
router.post("/login", loginWorker);
router.post("/", createWorker);
router.put("/:workers_id", upload, updateWorker);
router.patch("/update/:workers_id", updateSkillsWorkers);
router.delete("/:workers_id", deleteWorker);

module.exports = router;
