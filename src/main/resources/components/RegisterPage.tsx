import React, { useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

const userDatabase: [string, string][] = [
  ["alexandra.iotzova@emory.edu", "Password123"],
];

function RegistrationPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const navigate = useNavigate();

  const redirectToLoginPage = () => {
    navigate("/");
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  const handleRegistration = () => {
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Confirm Password:", confirmPassword);
    if (password != confirmPassword) {
      alert("Passwords do not match");
    }
    const confirmUser = userDatabase.find(([username, userPassword]) => {
      return username === email && userPassword === password;
    });
    if (confirmUser) {
      alert("Login already exists");
    } else {
      alert("Creating");
    }
  };

  return (
    <div className="register_page" id="register">
      <div className="login_box">
        <div className="login_header">
          <span className="blue_text">Team</span>Forge
        </div>
        <form className="login_form">
          <div className="subtitle">Register</div>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={handleEmailChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleRegistration();
                }
              }}
            />
          </div>
          <footer>
            <div className="login_bottom_left">
              Using Google? Return to Login.
            </div>
            <div className="login_bottom_right">
              <button
                className="login_redirect_button"
                type="button"
                onClick={redirectToLoginPage}
              >
                Login
              </button>
              <button type="button" onClick={handleRegistration}>
                Register
              </button>
            </div>
          </footer>
        </form>
      </div>
    </div>
  );
}

export default RegistrationPage;
