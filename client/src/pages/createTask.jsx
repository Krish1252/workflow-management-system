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

  const handleCreateTask = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:5000/api/tasks",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title,
            description,
            status,
            priority,
            dueDate,
          }),
        }
      );

      const data = await response.json();

      console.log(data);

      if (response.ok) {
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="create-page">
      <div className="create-wrapper">

        <button
          className="back-button"
          onClick={() => navigate("/dashboard")}
        >
          ← Back to Dashboard
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

        <form
          className="create-form"
          onSubmit={handleCreateTask}
        >

          <div className="form-group">
            <label>Task Title</label>

            <input
              type="text"
              placeholder="e.g. Build authentication system"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Description</label>

            <textarea
              placeholder="Describe what needs to be done..."
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
              required
            />
          </div>

          <div className="form-row">

            <div className="form-group">
              <label>Status</label>

              <select
                value={status}
                onChange={(e) =>
                  setStatus(e.target.value)
                }
              >
                <option value="Pending">
                  Pending
                </option>

                <option value="In Progress">
                  In Progress
                </option>

                <option value="Completed">
                  Completed
                </option>
              </select>
            </div>

            <div className="form-group">
              <label>Priority</label>

              <select
                value={priority}
                onChange={(e) =>
                  setPriority(e.target.value)
                }
              >
                <option value="Low">Low</option>

                <option value="Medium">
                  Medium
                </option>

                <option value="High">High</option>
              </select>
            </div>

          </div>

          <div className="form-group">
            <label>Due Date</label>

            <input
              type="date"
              value={dueDate}
              onChange={(e) =>
                setDueDate(e.target.value)
              }
              required
            />
          </div>

          <div className="form-actions">

            <button
              type="button"
              className="cancel-button"
              onClick={() => navigate("/dashboard")}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="submit-button"
            >
              <span>+</span>
              Create Task
            </button>

          </div>

        </form>

      </div>
    </div>
  );
}

export default CreateTask;