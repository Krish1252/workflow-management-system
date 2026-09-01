const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const {
  getProfile,
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
  getDashboard,
  searchTasks,
  filterTasks,
  sortTasks,
  paginateTasks,
} = require("../controllers/taskController");

router.get("/profile", protect, getProfile);
router.post("/", protect, createTask);
router.get("/", protect, getTasks);
router.get("/dashboard", protect, getDashboard);
router.get("/search", protect, searchTasks);
router.get("/filter", protect, filterTasks);
router.get("/sort", protect, sortTasks);
router.get("/pagination", protect, paginateTasks);
router.get("/:id", protect, getTaskById);
router.put("/:id", protect, updateTask);
router.delete("/:id", protect, deleteTask);

module.exports = router;