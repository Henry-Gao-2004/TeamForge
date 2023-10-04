import React, { useState } from "react";
import { ChangeEvent } from "react";
import { useNavigate  } from "react-router-dom";


let  userDatabase: [string, string][] = [
    ["alexandra.iotzova@emory.edu", "Password123"],
];

function LoginPage() {
    // State variables, hooks
    let navigate = useNavigate();

    const redirectToRegisterPage = () => {
        navigate("/RegisterPage");
    };

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
        <div className="login_page" id = "login">
            <h3>Login</h3>
            <form>
                <div className="form-group">
                    <label>Email:</label>
                    <input type="email" value={email} onChange={handleEmailChange} />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                </div>
                <button type="button" onClick={handleLogin}>
                    Login
                </button>
                <button type="button" onClick={redirectToRegisterPage}>
                    Register
                </button>
            </form>
        </div>
    );
}

export default LoginPage;
export const uDB  :  [string, string][] = userDatabase