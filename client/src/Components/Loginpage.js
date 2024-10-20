import React, { memo, Suspense, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { loginUser } from "../Redux/Actions/UserAction";
const CommanComponent = React.lazy(() => import("./CommanComponent"))
// LoginPage component definition
const LoginPage = () => {
  const Dispatch = useDispatch()
  const { loading, user, errorsmg } = useSelector((state) => state.user)
  const Navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false);
  // State for storing login data
  const [LoginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  // State for storing error messages
  const [error, setError] = useState({
    emailError: "",
    passwordError: "",
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...LoginData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(LoginData);
    const newError = {
      emailError: "",
      passwordError: "",
    };

    // Validate email length
    if (LoginData.email.length < 4) {
      newError.emailError = "Email must be at least 4 characters";
    }

    // Validate password length
    if (LoginData.password.length < 4) {
      newError.passwordError = "Password must be at least 4 characters";
    }
    // Check if both email and password have at least 4 characters
    if (LoginData.email.length >= 4 && LoginData.password.length >= 4) {
      // call the login api
      Dispatch(loginUser(LoginData, Navigate))
    }
    // Set error messages
    setError(newError);
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CommanComponent>
        <div className="m-auto max-h-max min-h-[450px] w-11/12  p-4 shadow-2xl lg:w-[500px] bg-white rounded-lg mack-view">
          <h1 className="text-center text-3xl font-medium text-white">Login</h1>
          <p className="mt-2 text-center text-white font-medium">Login to Access Your Account and Start Creating Quizzes</p>
          <form className="m-auto">
            <div className="mt-2 w-full">
              <p className="text-base text-slate-200">Email</p>
              <input type="text" name="email" value={LoginData.email} onChange={handleChange} className="mt-2 h-10 w-11/12 border p-1 rounded-lg" placeholder="Enter Email" />
              <p className="mt-1 text-sm font-semibold text-red-500">{error.emailError}</p>
            </div>
            <div className="mt-2">
              <p className="text-base text-slate-200">Password</p>
              <div className="mt-2 flex h-10 w-11/12 border rounded-lg bg-white">
                <input type={showPassword ? "text" : "password"} name="password" value={LoginData.password} onChange={handleChange} className="h-full w-full p-2 rounded-lg" placeholder="***********" />
                <button className="h-full w-10 bg-white rounded-lg" onClick={(event) => {
                  event.preventDefault()
                  setShowPassword(!showPassword)
                }
                }>
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6 text-black">

                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm-3 9c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8z" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6 text-black">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.98 8.223A10.451 10.451 0 0112 4.5c4.418 0 8 3.582 8 8 0 1.61-.47 3.11-1.28 4.377M3.98 8.223A10.451 10.451 0 003 12c0 4.418 3.582 8 8 8 1.61 0 3.11-.47 4.377-1.28M3.98 8.223L20.02 19.777M16.02 12.223A3 3 0 0012 9c-1.657 0-3 1.343-3 3 0 .61.18 1.18.48 1.66" />
                    </svg>
                  )}
                </button>
              </div>
              <p className="mt-1 text-sm font-semibold text-red-500">{error.passwordError}</p>
            </div>
            <button className="mt-5 h-11 w-11/12 flex justify-center items-center rounded-lg bg-blue-500 font-semibold text-white" onClick={handleSubmit}>
              {
                loading ? <>
                  <div className="w-7 h-7 rounded-full  border-l-2 border-b-2 border-white animate-spin"></div>
                </> : "Login"
              }
            </button>
            <p className="mt-1 text-sm font-semibold text-red-500"></p>
            <div className="mt-2 text-white">Already Have an account? <NavLink to="/signup" className="font-medium text-blue-400">Signup</NavLink></div>
          </form>
        </div>
      </CommanComponent>
    </Suspense>
  );

};

export default memo(LoginPage);
