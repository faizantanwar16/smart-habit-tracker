const Habit = require("../models/Habit");
const calculateStreak = require("../utils/streakHelper");
// Create Habit
const createHabit = async (req, res) => {
  try {
    const { title, description, frequency } = req.body;

    const habit = await Habit.create({
      user: req.user._id,
      title,
      description,
      frequency,
    });

    res.status(201).json(habit);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
// Get Habits
const getHabits = async (req, res) => {
  try {
    const habits = await Habit.find({
      user: req.user._id,
    });

    res.json(habits);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
// Delete Habit
const deleteHabit = async (req, res) => {
  try {
    const habit = await Habit.findById(req.params.id);

    if (!habit) {
      return res.status(404).json({
        message: "Habit not found",
      });
    }

    // Ensure habit belongs to logged-in user
    if (habit.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }

    await habit.deleteOne();

    res.json({
      message: "Habit deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
// Update Habit
const updateHabit = async (req, res) => {
  try {
    const habit = await Habit.findById(req.params.id);

    if (!habit) {
      return res.status(404).json({
        message: "Habit not found",
      });
    }

    if (habit.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }

    const updatedHabit = await Habit.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedHabit);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
// Complete Habit
const completeHabit = async (req, res) => {
  try {
    const habit = await Habit.findById(req.params.id);

    if (!habit) {
      return res.status(404).json({
        message: "Habit not found",
      });
    }

    // Verify ownership
    if (habit.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }

    const today = new Date();
    const alreadyCompletedToday = habit.completedDates.some(
  (date) =>
    new Date(date).toDateString() ===
    today.toDateString()
);

if (alreadyCompletedToday) {
  return res.status(400).json({
    message: "Habit already completed today",
  });
}
    // Add today's completion
    habit.completedDates.push(today);

    // Calculate new streak
    habit.streak = calculateStreak(
      habit.completedDates
    );

    await habit.save();

    res.json(habit);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
module.exports = {
  createHabit,
  getHabits,
  deleteHabit,
  updateHabit,
  completeHabit,
};