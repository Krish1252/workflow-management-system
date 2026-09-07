import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./create-task.css";

function CreateTask() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Pending");
  const [priority, setPriority] = useState("Medium");
  const [dueDate, setDueDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCreateTask = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      setError("Task title is required");
      return;
    }

    if (!description.trim()) {
      setError("Description is required");
      return;
    }

    if (!dueDate) {
      setError("Please select a due date");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:5000/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: title.trim(),
          description: description.trim(),
          status,
          priority,
          dueDate,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        navigate("/dashboard");
      } else {
        setError(data.message || "Unable to create task");
      }
    } catch (error) {
      setError("Unable to connect to server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-page">
      <div className="create-wrapper">
        <button
          className="back-button"
          onClick={() => navigate("/dashboard")}
        >
          <span>←</span>
          Back to Dashboard
        </button>

        <div className="create-header">
          <div className="create-icon">+</div>

          <div>
            <div className="create-label">WORKSPACE</div>

            <h1>Create New Task</h1>

            <p>
              Add a new task and keep your workflow organized.
            </p>
          </div>
        </div>

        <form className="create-form" onSubmit={handleCreateTask}>
          <div className="form-section">
            <div className="section-heading">
              <span>01</span>
              <div>
                <h2>Task details</h2>
                <p>Define what needs to be completed.</p>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="title">Task Title</label>

              <input
                id="title"
                type="text"
                placeholder="e.g. Build authentication system"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  setError("");
                }}
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>

              <textarea
                id="description"
                placeholder="Describe what needs to be done..."
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                  setError("");
                }}
              />
            </div>
          </div>

          <div className="form-divider"></div>

          <div className="form-section">
            <div className="section-heading">
              <span>02</span>
              <div>
                <h2>Task settings</h2>
                <p>Set the priority, status and deadline.</p>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="status">Status</label>

                <select
                  id="status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="priority">Priority</label>

                <select
                  id="priority"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="dueDate">Due Date</label>

              <input
                id="dueDate"
                type="date"
                value={dueDate}
                onChange={(e) => {
                  setDueDate(e.target.value);
                  setError("");
                }}
              />
            </div>
          </div>

          {error && <div className="create-error">{error}</div>}

          <div className="form-actions">
            <button
              type="button"
              className="cancel-button"
              onClick={() => navigate("/dashboard")}
              disabled={loading}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="submit-button"
              disabled={loading}
            >
              {loading ? "Creating..." : "Create Task"}
              {!loading && <span>+</span>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateTask;