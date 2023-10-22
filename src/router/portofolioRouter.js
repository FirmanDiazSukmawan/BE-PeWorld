const express = require("express");
const router = express.Router();
const {
  getPortofolio,
  getPortofolioById,
  getPortofolioByWorkersId,
  updatedPortofolio,
  deletedPortofolio,
  createdPortofolio,
} = require("../controller/portofolioController");
const {
  isRecruiter,
  isWorkers,
  LoginAuth,
} = require("../middleware/verifyRole");
const upload = require("../middleware/multer");

router.get("/", LoginAuth, getPortofolio);
router.get("/:portofolio_id", getPortofolioById);
router.get("/users/:workers_id", getPortofolioByWorkersId);
router.post("/", upload, createdPortofolio);
router.put("/:portofolio_id", upload, updatedPortofolio);
router.delete("/:portofolio_id", deletedPortofolio);

module.exports = router;
