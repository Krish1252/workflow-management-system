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
    const searchText = search.toLowerCase();

    const matchesSearch =
      task.title?.toLowerCase().includes(searchText) ||
      task.description?.toLowerCase().includes(searchText);

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

  const completionRate =
    totalTasks === 0
      ? 0
      : Math.round((completedTasks / totalTasks) * 100);

  const progressDegrees = completionRate * 3.6;

  return (
    <div className="dashboard">
      <header className="dashboard-topbar">
        <div className="topbar-search">
          <span className="search-icon">⌕</span>

          <input
            type="text"
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <span className="search-shortcut">/</span>
        </div>

        <div className="topbar-profile">
          <div className="profile-avatar">K</div>

          <div className="profile-details">
            <strong>Krish</strong>
            <span>Workspace member</span>
          </div>
        </div>
      </header>

      <main className="dashboard-content">
        <section className="dashboard-header">
          <div>
            <div className="welcome-label">WORKSPACE OVERVIEW</div>

            <h1 className="dashboard-title">Good morning, Krish</h1>

            <p className="dashboard-subtitle">
              Here's what's happening with your tasks today.
            </p>
          </div>

          <button
            className="create-button"
            onClick={() => navigate("/create-task")}
          >
            <span>+</span>
            New Task
          </button>
        </section>

        <section className="stats">
          <div className="stat-card primary-stat">
            <div className="stat-top">
              <div>
                <span className="stat-label">TOTAL TASKS</span>
                <div className="stat-number">{totalTasks}</div>
              </div>

              <div className="stat-icon total-icon">T</div>
            </div>

            <div className="stat-footer">
              All tasks in your workspace
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-top">
              <div>
                <span className="stat-label">IN PROGRESS</span>
                <div className="stat-number">{inProgressTasks}</div>
              </div>

              <div className="stat-icon progress-icon">P</div>
            </div>

            <div className="stat-footer">
              Currently being worked on
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-top">
              <div>
                <span className="stat-label">COMPLETED</span>
                <div className="stat-number">{completedTasks}</div>
              </div>

              <div className="stat-icon completed-icon">C</div>
            </div>

            <div className="stat-footer">
              Successfully completed
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-top">
              <div>
                <span className="stat-label">PENDING</span>
                <div className="stat-number">{pendingTasks}</div>
              </div>

              <div className="stat-icon pending-icon">P</div>
            </div>

            <div className="stat-footer">
              Waiting to be completed
            </div>
          </div>
        </section>

        <section className="dashboard-grid">
          <div className="tasks-panel">
            <div className="panel-header">
              <div>
                <div className="panel-label">WORKSPACE</div>

                <h2>My Tasks</h2>

                <p>
                  {filteredTasks.length} task
                  {filteredTasks.length !== 1 ? "s" : ""} found
                </p>
              </div>

              <button
                className="panel-create-button"
                onClick={() => navigate("/create-task")}
              >
                <span>+</span>
                Add Task
              </button>
            </div>

            <div className="filters">
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

            {loading ? (
              <div className="empty-state">
                <div className="loader"></div>
                <h3>Loading your tasks</h3>
                <p>Please wait while we load your workspace.</p>
              </div>
            ) : filteredTasks.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">+</div>

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
              <div className="task-list">
                {filteredTasks.map((task) => (
                  <article className="task-row" key={task._id}>
                    <div className="task-main">
                      <div
                        className={`task-check ${
                          task.status === "Completed" ? "checked" : ""
                        }`}
                      >
                        {task.status === "Completed" ? "✓" : ""}
                      </div>

                      <div className="task-info">
                        <h3>{task.title}</h3>

                        <p>
                          {task.description || "No description provided."}
                        </p>

                        <div className="task-details">
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
                              ? new Date(
                                  task.dueDate
                                ).toLocaleDateString()
                              : "—"}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="task-right">
                      <span
                        className={`priority-badge ${task.priority
                          ?.toLowerCase()
                          .replace(" ", "-")}`}
                      >
                        {task.priority}
                      </span>

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
                  </article>
                ))}
              </div>
            )}
          </div>

          <aside className="progress-panel">
            <div className="panel-label">OVERVIEW</div>

            <h2>Progress</h2>

            <p className="progress-description">
              Keep your workflow moving forward.
            </p>

            <div
              className="progress-circle"
              style={{
                background: `conic-gradient(#7c3aed ${progressDegrees}deg, #ede9fe ${progressDegrees}deg)`,
              }}
            >
              <div>
                <strong>{completionRate}%</strong>
                <span>Complete</span>
              </div>
            </div>

            <div className="progress-stats">
              <div>
                <span className="progress-dot completed"></span>
                <span>Completed</span>
                <strong>{completedTasks}</strong>
              </div>

              <div>
                <span className="progress-dot active"></span>
                <span>In Progress</span>
                <strong>{inProgressTasks}</strong>
              </div>

              <div>
                <span className="progress-dot pending"></span>
                <span>Pending</span>
                <strong>{pendingTasks}</strong>
              </div>
            </div>
          </aside>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;