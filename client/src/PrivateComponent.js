import React, { memo, Suspense, useEffect, useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
const NaviagtionBar = React.lazy(() => import("./Components/SubComponents/NavigationBar"))
// PrivateComponent to protect routes that require authentication
const PrivateComponent = () => {
    // State to track if the user is logged in
    const [isLoggedIn, setIsLoggedIn] = useState(true);

    // useEffect to check for token in localStorage on component mount
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, []);

    return (
        <>
            {
                // If user is logged in, render the child components
                isLoggedIn ? (
                    <>
                        <Suspense fallback={<h1>Loading...</h1>}>
                            <NaviagtionBar />
                            <Outlet />
                        </Suspense>
                    </>
                ) : (
                    // If user is not logged in, navigate to the signup page
                    <Navigate to="/signup" />
                )
            }
        </>
    );
};

export default memo(PrivateComponent);
