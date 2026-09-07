import { useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import CreateTask from "./pages/createTask";
import EditTask from "./pages/editTask";
import Sidebar from "./components/sidebar";
import Register from "./pages/register";

function App() {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const isLoginPage = location.pathname === "/login";

  const toggleSidebar = () => {
    setSidebarOpen((current) => !current);
  };

  return (
    <div className={isLoginPage ? "app" : "app-shell"}>
      {!isLoginPage && (
        <Sidebar
          isOpen={sidebarOpen}
          onToggle={toggleSidebar}
        />
      )}

      <div className={isLoginPage ? "app-content" : "main-content"}>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create-task" element={<CreateTask />} />
          <Route path="/edit-task/:id" element={<EditTask />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;