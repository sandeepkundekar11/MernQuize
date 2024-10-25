import React, { memo, Suspense, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { signUpUser } from "../Redux/Actions/UserAction";
const CommanComponent = React.lazy(() => import("./CommanComponent"));
// SignupPage component for user registration
const SignupPage = () => {
  const Navigate = useNavigate()
  const Dispatch = useDispatch()
  const { loading, user, errorsmg } = useSelector((state) => state.user)
  // State to store user input for signup
  const [signupInfo, setSignupInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  // State to store error messages for form validation
  const [error, setError] = useState({
    firstNameError: "",
    lastNameError: "",
    emailError: "",
    passwordError: "",
  });

  // Handler for input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupInfo({ ...signupInfo, [name]: value });
  };

  // Handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault()
    // Initialize new error object
    const newError = {
      firstNameError: "",
      lastNameError: "",
      emailError: "",
      passwordError: "",
    };

    // Validate first name
    if (signupInfo.firstName.length < 4) {
      newError.firstNameError = "First Name can't be less than 4 characters";
    }

    // Validate last name
    if (signupInfo.lastName.length < 4) {
      newError.lastNameError = "Last Name can't be less than 4 characters";
    }

    // Validate email
    if (signupInfo.email.length < 4) {
      newError.emailError = "Email can't be less than 4 characters";
    }

    // Validate password
    if (signupInfo.password.length < 4) {
      newError.passwordError = "Password can't be less than 4 characters";
    }

    // If all fields are valid, proceed with signup
    if (
      signupInfo.firstName.length >= 4 &&
      signupInfo.lastName.length >= 4 &&
      signupInfo.email.length >= 4 &&
      signupInfo.password.length >= 4
    ) {
      //  Implement API call to signup the user
      Dispatch(signUpUser(signupInfo, Navigate))
    }

    // Update error state
    setError(newError);
  };

  // Render signup form
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CommanComponent>
        <div className="m-auto max-h-max min-h-[600px] w-11/12  p-4 shadow-2xl lg:w-[500px] bg-white rounded-lg mack-view">
          <h1 className="text-center text-3xl font-medium text-white">
            Signup
          </h1>

          <p className="mt-2 text-center text-white font-medium">
            Sign In to Explore and Create Quizzes
          </p>

          <form className="m-auto">
            <div className="mt-2 w-full">
              <p className="text-base text-slate-200">FirstName</p>
              <input
                type="text"
                name="firstName"
                value={signupInfo.firstName}
                onChange={handleChange}
                className="mt-2 h-10 w-11/12 border p-1 rounded-lg"
                placeholder="Enter firstName"
              />
              <p className="mt-1 text-sm font-semibold text-red-500">
                {error.firstNameError}
              </p>
            </div>
            <div className="mt-2 w-full">
              <p className="text-base text-slate-200">LastName</p>
              <input
                type="text"
                name="lastName"
                value={signupInfo.lastName}
                onChange={handleChange}
                className="mt-2 h-10 w-11/12 border p-1 rounded-lg"
                placeholder="Enter LastName"
              />
              <p className="mt-1 text-sm font-semibold text-red-500">
                {error.lastNameError}
              </p>
            </div>
            <div className="mt-2 w-full">
              <p className="text-base text-slate-200">Email</p>
              <input
                type="text"
                name="email"
                value={signupInfo.email}
                onChange={handleChange}
                className="mt-2 h-10 w-11/12 border p-1 rounded-lg"
                placeholder="Enter Email"
              />

              <p className="mt-1 text-sm font-semibold text-red-500">
                {error.emailError}
              </p>
            </div>
            <div className="mt-2">
              <p className="text-base text-slate-200">Password</p>
              <div className="mt-2 flex h-10 w-11/12 border rounded-lg bg-white">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={signupInfo.password}
                  onChange={handleChange}
                  className="h-full w-full p-2 rounded-lg"
                  placeholder="***********"
                />
                <button
                  className="h-full w-10 bg-white rounded-lg"
                  onClick={(e) => {
                    e.preventDefault()
                    setShowPassword(!showPassword)
                  }}
                >
                  {showPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="h-6 w-6 text-black"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm-3 9c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8z"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="h-6 w-6 text-black"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3.98 8.223A10.451 10.451 0 0112 4.5c4.418 0 8 3.582 8 8 0 1.61-.47 3.11-1.28 4.377M3.98 8.223A10.451 10.451 0 003 12c0 4.418 3.582 8 8 8 1.61 0 3.11-.47 4.377-1.28M3.98 8.223L20.02 19.777M16.02 12.223A3 3 0 0012 9c-1.657 0-3 1.343-3 3 0 .61.18 1.18.48 1.66"
                      />
                    </svg>
                  )}
                </button>
              </div>
              <p className="mt-1 text-sm font-semibold text-red-500">
                {error.passwordError}
              </p>
            </div>
            <button className="mt-5 h-11 w-11/12 flex justify-center items-center rounded-lg bg-blue-500 font-semibold text-white" onClick={handleSubmit}>
              {
                loading ? <>
                  <div className="w-7 h-7 rounded-full  border-l-2 border-b-2 border-white animate-spin"></div>
                </> : "Signup"
              }

            </button>
            <p className="mt-1 text-sm font-semibold text-red-500"></p>

            <div className="mt-2 text-white">
              Already Have an account?{" "}
              <NavLink to="/login" className="font-medium text-blue-400">
                Login
              </NavLink>
            </div>
          </form>
        </div>
      </CommanComponent>
    </Suspense>
  );
};

export default memo(SignupPage);
