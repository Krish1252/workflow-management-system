import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/users/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      console.log(data);

      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        navigate("/dashboard", { replace: true });
      } else {
        alert(data.message || "Login failed");
      }
    } catch (error) {
      console.log(error);
      alert("Unable to connect to server");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-brand">
          <div className="login-logo">W</div>
          <span>Workflow</span>
        </div>

        <div className="login-heading">
          <h1>Welcome back</h1>
          <p>Sign in to manage your tasks and workflow.</p>
        </div>

        <div className="login-form">
          <div className="login-field">
            <label>Email address</label>

            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="login-field">
            <div className="password-label">
              <label>Password</label>
              <span>Required</span>
            </div>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            className="login-button"
            onClick={handleLogin}
          >
            Sign In
          </button>
        </div>

        <div className="login-footer">
          <span>Don't have an account?</span>

          <button onClick={() => navigate("/register")}>
            Create account
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;