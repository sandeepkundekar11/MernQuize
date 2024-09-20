import { memo, useState } from "react";
import { NavLink } from "react-router-dom";

// SignupPage component for user registration
const SignupPage = () => {
    // State to store user input for signup
    const [signupInfo, setSignupInfo] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    });

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
    }

    // Handler for form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        // Initialize new error object
        const newError = {
            firstNameError: "",
            lastNameError: "",
            emailError: "",
            passwordError: "",
        }

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
        if (signupInfo.firstName.length >= 4 && signupInfo.lastName.length >= 4 && signupInfo.email.length >= 4 && signupInfo.password.length >= 4) {
            //  Implement API call to signup the user
        }

        // Update error state
        setError(newError);
    }

    // Render signup form
    return (
        <div className="min-h-screen flex items-center justify-center bg-background text-foreground  ">
            <div className="bg-card p-8 rounded-lg shadow-lg w-full max-w-md border-2 border-border">
                <h1 className="text-2xl font-bold mb-6 text-center">Sign Up</h1>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    {/* First Name input */}
                    <div>
                        <label htmlFor="fname" className="block text-sm font-medium text-muted-foreground">First Name</label>
                        <input type="text" name="firstName" onChange={handleChange} id="fname" className="mt-1 block w-full px-3 py-2 bg-input border border-border rounded-md text-foreground focus:outline-none focus:ring focus:ring-primary" placeholder="Your Name" />
                        <p className="text-red-500 text-sm">{error.firstNameError}</p>
                    </div>
                    {/* Last Name input */}
                    <div>
                        <label htmlFor="lname" className="block text-sm font-medium text-muted-foreground">Last Name</label>
                        <input type="text" name="lastName" onChange={handleChange} id="lname" className="mt-1 block w-full px-3 py-2 bg-input border border-border rounded-md text-foreground focus:outline-none focus:ring focus:ring-primary" placeholder="Your Name" />
                        <p className="text-red-500 text-sm">{error.lastNameError}</p>
                    </div>
                    {/* Email input */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-muted-foreground">Email</label>
                        <input type="email" id="email" name="email" onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-input border border-border rounded-md text-foreground focus:outline-none focus:ring focus:ring-primary" placeholder="you@example.com" />
                        <p className="text-red-500 text-sm">{error.emailError}</p>
                    </div>
                    {/* Password input */}
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-muted-foreground">Password</label>
                        <input type="password" id="password" name="password" onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-input border border-border rounded-md text-foreground focus:outline-none focus:ring focus:ring-primary" placeholder="••••••••" />
                        <p className="text-red-500 text-sm">{error.passwordError}</p>
                    </div>

                    {/* Submit button */}
                    <button type="submit" className=" w-full bg-blue-500 text-white font-bold hover:bg-blue-600 py-2 rounded-md  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">Sign Up</button>
                </form>
                {/* Login link */}
                <p className="mt-6 text-center text-sm text-muted-foreground">
                    Already have an account? <NavLink to="/login" className="text-blue-500 font-bold hover:underline">Log in</NavLink>
                </p>
            </div>
        </div>
    )
}

export default memo(SignupPage);