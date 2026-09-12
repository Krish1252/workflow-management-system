import { useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import Login from "./pages/login";
import Register from "./pages/register";
import Dashboard from "./pages/dashboard";
import CreateTask from "./pages/createTask";
import EditTask from "./pages/editTask";
import Sidebar from "./components/sidebar";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function App() {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const isPublicPage =
    location.pathname === "/login" ||
    location.pathname === "/register";

  const toggleSidebar = () => {
    setSidebarOpen((current) => !current);
  };

  return (
    <div className={isPublicPage ? "app" : "app-shell"}>
      {!isPublicPage && (
        <Sidebar
          isOpen={sidebarOpen}
          onToggle={toggleSidebar}
        />
      )}

      <div className={isPublicPage ? "app-content" : "main-content"}>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />

          <Route path="/login" element={<Login />} />

          <Route path="/register" element={<Register />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/create-task"
            element={
              <ProtectedRoute>
                <CreateTask />
              </ProtectedRoute>
            }
          />

          <Route
            path="/edit-task/:id"
            element={
              <ProtectedRoute>
                <EditTask />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;