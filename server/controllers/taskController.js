const getProfile = async (req, res) => {
  res.status(200).json({
    message: "Protected Route Accessed Successfully",
    user: req.user,
  });
};



const Task = require("../models/Task");

const createTask = async (req, res) => {
  try {
    const { title, description, status, priority, dueDate } = req.body;

    const task = await Task.create({
      title,
      description,
      status,
      priority,
      dueDate,
      user: req.user.id,
    });

    res.status(201).json({
      message: "Task Created Successfully",
      task,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({
      user: req.user.id,
    }).sort({
      createdAt: -1,
    });

    res.status(200).json(tasks);

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

const getTaskById = async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.status(200).json(task);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

const updateTask = async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    res.status(200).json({
      message: "Task Updated Successfully",
      task: updatedTask,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    await Task.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Task Deleted Successfully",
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

const getDashboard = async (req, res) => {
  try {
    const totalTasks = await Task.countDocuments({
      user: req.user.id,
    });

    const pendingTasks = await Task.countDocuments({
      user: req.user.id,
      status: "Pending",
    });

    const inProgressTasks = await Task.countDocuments({
      user: req.user.id,
      status: "In Progress",
    });

    const completedTasks = await Task.countDocuments({
      user: req.user.id,
      status: "Completed",
    });

    res.status(200).json({
      totalTasks,
      pendingTasks,
      inProgressTasks,
      completedTasks,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

const searchTasks = async (req, res) => {
  try {
    const keyword = req.query.search || "";

    const tasks = await Task.find({
      user: req.user.id,
      title: {
        $regex: keyword,
        $options: "i",
      },
    });

    res.status(200).json(tasks);

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

const filterTasks = async (req, res) => {
  try {
    const { status, priority } = req.query;

    const filter = {
      user: req.user.id,
    };

    if (status) {
      filter.status = status;
    }

    if (priority) {
      filter.priority = priority;
    }

    const tasks = await Task.find(filter);

    res.status(200).json(tasks);

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

const sortTasks = async (req, res) => {
  try {
    const { sort } = req.query;

    let sortOption = {};

    if (sort === "newest") {
      sortOption = { createdAt: -1 };
    } else if (sort === "oldest") {
      sortOption = { createdAt: 1 };
    } else if (sort === "priority") {
      sortOption = { priority: 1 };
    } else if (sort === "dueDate") {
      sortOption = { dueDate: 1 };
    }

    const tasks = await Task.find({
      user: req.user.id,
    }).sort(sortOption);

    res.status(200).json(tasks);

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

const paginateTasks = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;

    const skip = (page - 1) * limit;

    const totalTasks = await Task.countDocuments({
      user: req.user.id,
    });

    const tasks = await Task.find({
      user: req.user.id,
    })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      currentPage: page,
      totalPages: Math.ceil(totalTasks / limit),
      totalTasks,
      tasks,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

module.exports = {
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
};