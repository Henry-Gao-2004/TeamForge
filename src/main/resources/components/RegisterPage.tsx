import React, { useState } from "react";
import { ChangeEvent } from "react";

/*const userDatabase: [string, string][] = [
    ["alexandra.iotzova@emory.edu", "Password123"]
];*/
function RegistrationPage() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");

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
        fetch('/api/createprofile')
            .then(response => response.json())
            .then(data => console.log("Server response: ", data))
            .catch(error => {
                console.error('Error:', error);
            });
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
            </form>
        </div>
    );
}

export default RegistrationPage;
