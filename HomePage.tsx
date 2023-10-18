import React, { useState } from "react";
import { useNavigate  } from "react-router-dom";

function HomePage() {
    // State variables, hooks
    let navigate = useNavigate();

    const redirectToHomePage = () => {
        navigate("/HomePage");
    };

return (
    <div className="home_page">
        <h3>Register</h3>
        <form>
            <button
                className="login_page"
                type="button"
                onClick={redirectToHomePage}
            >
                Login
            </button>
        </form>
    </div>
);
}
