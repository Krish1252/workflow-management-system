import { NavLink, useNavigate } from "react-router-dom";
import "./sidebar.css";

function sidebar({ isOpen, onToggle }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <aside className={`sidebar ${isOpen ? "open" : "collapsed"}`}>
      <div className="sidebar-header">
        <div className="sidebar-brand">
          <div className="sidebar-logo">W</div>

          <div className="sidebar-brand-text">
            <h2>Workflow</h2>
            <p>Management System</p>
          </div>
        </div>

        <button
          className="sidebar-toggle"
          onClick={onToggle}
          aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      <div className="sidebar-section">
        <span className="sidebar-section-title">Workspace</span>

        <nav className="sidebar-nav">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive ? "sidebar-link active" : "sidebar-link"
            }
          >
            <span className="nav-symbol">D</span>
            <span className="nav-label">Dashboard</span>
          </NavLink>

          <NavLink
            to="/create-task"
            className={({ isActive }) =>
              isActive ? "sidebar-link active" : "sidebar-link"
            }
          >
            <span className="nav-symbol">+</span>
            <span className="nav-label">Create Task</span>
          </NavLink>
        </nav>
      </div>

      <div className="sidebar-bottom">
        <div className="sidebar-user">
          <div className="sidebar-avatar">K</div>

          <div className="sidebar-user-info">
            <strong>Krish</strong>
            <span>Workspace member</span>
          </div>
        </div>

        <button className="sidebar-logout" onClick={handleLogout}>
          <span className="logout-symbol">L</span>
          <span className="logout-label">Logout</span>
        </button>
      </div>
    </aside>
  );
}

export default sidebar;