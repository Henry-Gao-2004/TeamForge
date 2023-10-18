import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

let userDatabase: [string, string][] = [
  ["alexandra.iotzova@emory.edu", "Password123"],
  ["ekurchin@emory.edu", "Password456"],
  ["hrmitch@emory.edu", "Password789"],
];

function LoginPage() {
  /* Google Authentication.*/
  // User cache.
  // useState gives bus the user object and a setter function.
  const [user, setUser] = useState({});

  // Global Google.
  function handleCallbackResponse(response) {
    // response.credential is the JSON web token we recieve from login.
    // response comes from documentation from google's id services.
    console.log("Encoded JWT ID Token: " + response.credential);

    var userObject = jwt_decode(response.credential);
    console.log(userObject);
    setUser(userObject);

    // Hide the sign in button when we log in.
    document.getElementById("signInDiv").hidden = true;
  }

  function handleSignOut(event) {
    // clear user object
    setUser({});
    document.getElementById("signInDiv").hidden = false;
  }

  useEffect(() => {
    google.accounts.id.initialize({
      client_id:
        "633951300634-vu1l1cnpnmuuls39nteir5qr0s1rj4dj.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });
    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
      size: "large",
    });

    // Google's "1-tap dialogue" to log in.
    // prompt (pop-up) shows accounts that you recently logged in with for easier access.
    // prompt still activates the same callback response.
  }, []);

  // Redirects.
  const navigate = useNavigate();
  const redirectToRegisterPage = () => {
    navigate("./RegisterPage");
  };

  // State variables, hooks.
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  // Handlers.
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
      navigate("/HomePage"), { state: { email: email } };
    } else {
      alert("Invalid username or password");
    }
  };

  return (
    <div className="login_box" id="login">
      <div className="login_header">
        <span className="blue_text">Team</span>Forge
      </div>
      <form className="login_form">
        <div className="subtitle">Login</div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email"
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
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleLogin();
              }
            }}
          />
        </div>
        <footer>
          <div className="login_bottom_left" id="signInDiv">
            Login with Google.
          </div>
          {
            //to show signout button when logged in

            //P && Q: if P is true do Q
            Object.keys(user).length != 0 && (
              <button onClick={(e) => handleSignOut(e)}>Sign Out</button>
            )
          }
          {user && (
            <div>
              {/* once signed in, we display the username and profile picture */}
              <img src={user.picture}></img>
              <h3>{user.name}</h3>
            </div>
          )}
          <div className="login_bottom_right">
            <button
              className="login_button"
              type="button"
              onClick={handleLogin}
            >
              Login
            </button>
            <button
              className="login_redirect_button"
              type="button"
              onClick={redirectToRegisterPage}
            >
              Register
            </button>
          </div>
        </footer>
      </form>
    </div>
  );
}

export default LoginPage;
