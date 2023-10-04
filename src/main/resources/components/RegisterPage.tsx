import React, { useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import {uDB} from "./LoginPage";


//const userDatabase: [string, string][] = [
//   ["alexandra.iotzova@emory.edu", "Password123"]
//];

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
        if (password != confirmPassword ) {
            alert("Passwords do not match")
        }
        const confirmUser = uDB.find(([username, userPassword]) => {
            return username === email && userPassword === password;
        });
        if (confirmUser) {
            alert("Login already  there");
        } else {
            alert("Creating");

        }

    };

    return (
        <div className="registration_page">
            <h3>Register</h3>
            <form>
                <div className="form-group">
                    <label>Email:</label>
                    <input type="email" value={email} onChange={handleEmailChange} />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input type="password" value={password} onChange={handlePasswordChange} />
                </div>
                <div className="form-group">
                    <label>Confirm Password:</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                    />
                </div>
                <button type="button" onClick={handleRegistration}>
                    Register
                </button>
                <button
                    className="login_page"
                    type="button"
                    onClick={redirectToLoginPage}
                >
                    Login
                </button>
            </form>
        </div>
    );
}

export default RegistrationPage;
