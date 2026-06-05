const express = require("express");
const router = express.Router();

const {
  createHabit,
  getHabits,
  deleteHabit,
  updateHabit,
    completeHabit,
} = require("../controllers/habitController");
const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, createHabit);
router.get("/", protect, getHabits);
router.delete("/:id", protect, deleteHabit);
router.put("/:id", protect, updateHabit);
router.post("/:id/complete", protect, completeHabit);
module.exports = router;