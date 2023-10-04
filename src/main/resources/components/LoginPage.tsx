import React, { useState } from "react";
import { ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

const userDatabase: [string, string][] = [
  ["hrmitch@emory.edu", "Password123"],
  ["ekurchin@emory.edu", "Password456"],
];

function LoginPage() {
  // Redirect
  const navigate = useNavigate();
  const redirectToRegisterPage = () => {
    navigate("./RegisterPage");
  };

  // State variables, hooks
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  // Handlers
  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const handleLogin = () => {
    const confirmUser = userDatabase.find(([username, userPassword]) => {
      return username === email && userPassword === password;
    });
    if (confirmUser) {
      alert("Login successful");
    } else {
      alert("Invalid username or password");
    }
  };

  return (
    <div className="login_page">
      <div className="circle"></div>
      <div className="circle"></div>
      <div className="login_box">
        <h3>Login</h3>
        <form className="login_form">
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleLogin();
                }
              }}
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleLogin();
                }
              }}
            />
          </div>
          <button className="login_button" type="button" onClick={handleLogin}>
            Login
          </button>
        </form>
        <button
          className="register_button"
          type="button"
          onClick={redirectToRegisterPage}
        >
          Register
        </button>
      </div>
    </div>
  );
}

export default LoginPage;
