import { memo, useEffect, useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";

// PrivateComponent to protect routes that require authentication
const PrivateComponent = () => {

    // State to track if the user is logged in
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // useEffect to check for token in localStorage on component mount
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, []);

    return (
        <>
            {
                // If user is logged in, render the child components
                isLoggedIn ? <Outlet />
                    // If user is not logged in, navigate to the signup page
                    : <Navigate to="/signup" />
            }
        </>
    )
};

export default memo(PrivateComponent);