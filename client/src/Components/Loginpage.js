import { memo, useState } from "react";
import { NavLink } from "react-router-dom";

// LoginPage component definition
const LoginPage = () => {
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
    }
    // Set error messages
    setError(newError);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
      <div className="w-full max-w-md h-[500px] p-8 space-y-8 bg-card rounded-lg shadow-lg border-2 ">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold">
            Sign in to your account
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Welcome back! Please enter your details.
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm ">
            <div>
              <p className="text-sm font-semibold text-gray-500">
                Email address
              </p>
              <input
                id="email-address"
                name="email"
                type="email"
                value={LoginData.email}
                onChange={handleChange}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-input placeholder-muted-foreground text-foreground rounded-t-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
              {error.emailError && (
                <p className="text-red-500 text-sm">{error.emailError}</p>
              )}
            </div>
            <div className="mt-4">
              <p className="text-sm font-semibold text-gray-500">
                Password
              </p>
              <input
                value={LoginData.password}
                onChange={handleChange}
                name="password"
                type="password"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-input placeholder-muted-foreground text-foreground rounded-b-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                placeholder="Password"
              />
              {error.passwordError && (
                <p className="text-red-500 text-sm">{error.passwordError}</p>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full bg-blue-500 font-bold text-white hover:bg-blue-600 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Sign in
            </button>
          </div>
        </form>
        <div className="text-center text-sm text-muted-foreground">
          <p>
            Don't have an account?{" "}
            <NavLink
              to="/signup"
              className="font-medium text-primary hover:text-primary-foreground"
            >
              Sign up
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};
export default memo(LoginPage);
