import { NavLink, useNavigate } from "react-router-dom";
import "./navbar.css";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-inner">

        <div
          className="brand"
          onClick={() => navigate("/dashboard")}
        >
          <div className="brand-icon">W</div>

          <div>
            <div className="brand-name">Workflow</div>
            <div className="brand-subtitle">Management System</div>
          </div>
        </div>

        <div className="nav-links">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/create-task"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Create Task
          </NavLink>
        </div>

        <div className="navbar-right">
          <div className="user-avatar">K</div>

          <button
            className="logout-button"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;