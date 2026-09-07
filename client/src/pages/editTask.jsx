import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./edit-task.css";

function EditTask() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Pending");
  const [priority, setPriority] = useState("Medium");
  const [dueDate, setDueDate] = useState("");

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          `http://localhost:5000/api/tasks/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (response.ok) {
          setTitle(data.title || "");
          setDescription(data.description || "");
          setStatus(data.status || "Pending");
          setPriority(data.priority || "Medium");
          setDueDate(data.dueDate?.split("T")[0] || "");
        } else {
          setError(data.message || "Unable to load task");
        }
      } catch (error) {
        setError("Unable to connect to server");
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [id]);

  const handleUpdateTask = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      setError("Task title is required");
      return;
    }

    if (!description.trim()) {
      setError("Description is required");
      return;
    }

    try {
      setUpdating(true);
      setError("");

      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:5000/api/tasks/${id}`,
        {
          method: "PUT",
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
        }
      );

      const data = await response.json();

      if (response.ok) {
        navigate("/dashboard");
      } else {
        setError(data.message || "Unable to update task");
      }
    } catch (error) {
      setError("Unable to connect to server");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="edit-page">
        <div className="edit-loading">
          <div className="edit-loader"></div>
          <h3>Loading task</h3>
          <p>Please wait while we load the task details.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="edit-page">
      <div className="edit-wrapper">
        <button
          className="back-button"
          onClick={() => navigate("/dashboard")}
        >
          <span>←</span>
          Back to Dashboard
        </button>

        <div className="edit-header">
          <div className="edit-icon">E</div>

          <div>
            <div className="edit-label">WORKSPACE</div>

            <h1>Edit Task</h1>

            <p>
              Update your task details and keep your workflow on track.
            </p>
          </div>
        </div>

        <form className="edit-form" onSubmit={handleUpdateTask}>
          <div className="form-section">
            <div className="section-heading">
              <span>01</span>

              <div>
                <h2>Task details</h2>
                <p>Update the information about this task.</p>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="edit-title">Task Title</label>

              <input
                id="edit-title"
                type="text"
                placeholder="Task title"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  setError("");
                }}
              />
            </div>

            <div className="form-group">
              <label htmlFor="edit-description">Description</label>

              <textarea
                id="edit-description"
                placeholder="Task description"
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
                <p>Adjust status, priority and deadline.</p>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="edit-status">Status</label>

                <select
                  id="edit-status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="edit-priority">Priority</label>

                <select
                  id="edit-priority"
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
              <label htmlFor="edit-due-date">Due Date</label>

              <input
                id="edit-due-date"
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>
          </div>

          {error && <div className="edit-error">{error}</div>}

          <div className="form-actions">
            <button
              type="button"
              className="cancel-button"
              onClick={() => navigate("/dashboard")}
              disabled={updating}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="update-button"
              disabled={updating}
            >
              {updating ? "Saving..." : "Save Changes"}
              {!updating && <span>✓</span>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditTask;