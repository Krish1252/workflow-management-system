import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./dashboard.css";

function Dashboard() {
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:5000/api/tasks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        setTasks(data.tasks || data);
      } else {
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (taskId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:5000/api/tasks/${taskId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        setTasks((currentTasks) =>
          currentTasks.filter((task) => task._id !== taskId)
        );
      } else {
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title?.toLowerCase().includes(search.toLowerCase()) ||
      task.description?.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || task.status === statusFilter;

    const matchesPriority =
      priorityFilter === "All" || task.priority === priorityFilter;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  const totalTasks = tasks.length;

  const pendingTasks = tasks.filter(
    (task) => task.status === "Pending"
  ).length;

  const inProgressTasks = tasks.filter(
    (task) => task.status === "In Progress"
  ).length;

  const completedTasks = tasks.filter(
    (task) => task.status === "Completed"
  ).length;

  return (
    <div className="dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <div>
          <div className="welcome-label">WORKSPACE</div>

          <h1 className="dashboard-title">Dashboard</h1>

          <p className="dashboard-subtitle">
            Manage your tasks, track progress and stay organized.
          </p>
        </div>

        <button
          className="create-button"
          onClick={() => navigate("/create-task")}
        >
          <span>+</span>
          Create Task
        </button>
      </div>

      {/* Stats */}
      <div className="stats">
        <div className="stat-card">
          <div className="stat-top">
            <span className="stat-icon total-icon">✓</span>
            <span className="stat-label">TOTAL TASKS</span>
          </div>

          <div className="stat-number">{totalTasks}</div>

          <div className="stat-footer">
            All tasks in your workspace
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-top">
            <span className="stat-icon progress-icon">◷</span>
            <span className="stat-label">IN PROGRESS</span>
          </div>

          <div className="stat-number">{inProgressTasks}</div>

          <div className="stat-footer">
            Currently being worked on
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-top">
            <span className="stat-icon completed-icon">✓</span>
            <span className="stat-label">COMPLETED</span>
          </div>

          <div className="stat-number">{completedTasks}</div>

          <div className="stat-footer">
            Successfully completed
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-top">
            <span className="stat-icon pending-icon">!</span>
            <span className="stat-label">PENDING</span>
          </div>

          <div className="stat-number">{pendingTasks}</div>

          <div className="stat-footer">
            Waiting to be completed
          </div>
        </div>
      </div>

      {/* Tasks section */}
      <div className="tasks-container">
        <div className="tasks-heading">
          <div>
            <h2>My Tasks</h2>
            <p>
              {filteredTasks.length} task
              {filteredTasks.length !== 1 ? "s" : ""} found
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="filters">
          <div className="search-box">
            <span>⌕</span>

            <input
              type="text"
              placeholder="Search tasks..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Status</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>

          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
          >
            <option value="All">All Priority</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        {/* Tasks */}
        {loading ? (
          <div className="empty-state">
            <div className="loader"></div>
            <p>Loading your tasks...</p>
          </div>
        ) : filteredTasks.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">✓</div>
            <h3>No tasks found</h3>
            <p>
              Create a new task or change your search and filters.
            </p>

            <button
              className="empty-button"
              onClick={() => navigate("/create-task")}
            >
              Create your first task
            </button>
          </div>
        ) : (
          <div className="task-grid">
            {filteredTasks.map((task) => (
              <div className="task-card" key={task._id}>
                <div className="task-card-header">
                  <div className="task-title-area">
                    <h3>{task.title}</h3>
                  </div>

                  <span
                    className={`priority-badge ${task.priority
                      ?.toLowerCase()
                      .replace(" ", "-")}`}
                  >
                    {task.priority}
                  </span>
                </div>

                <p className="task-description">
                  {task.description || "No description provided."}
                </p>

                <div className="task-meta">
                  <span
                    className={`status-badge ${task.status
                      ?.toLowerCase()
                      .replace(" ", "-")}`}
                  >
                    <span className="status-dot"></span>
                    {task.status}
                  </span>

                  <span className="due-date">
                    Due{" "}
                    {task.dueDate
                      ? new Date(task.dueDate).toLocaleDateString()
                      : "—"}
                  </span>
                </div>

                <div className="task-divider"></div>

                <div className="task-actions">
                  <button
                    className="edit-button"
                    onClick={() =>
                      navigate(`/edit-task/${task._id}`)
                    }
                  >
                    Edit
                  </button>

                  <button
                    className="delete-button"
                    onClick={() => handleDelete(task._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;