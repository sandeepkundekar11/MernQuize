import React, { Suspense } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
const LoginPage = React.lazy(() => import("./Components/Loginpage"))
const SignupPage = React.lazy(() => import("./Components/SignupPage"))
const HomePage = React.lazy(() => import("./Components/HomePage"))
const PrivateComponent = React.lazy(() => import("./PrivateComponent"))
const App = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BrowserRouter>
        <Routes>
          {/* Route for login page */}
          <Route path="/login" element={<LoginPage />} />
          {/* Route for signup page */}
          <Route path="/signup" element={<SignupPage />} />
          {/* Private route for authenticated users */}
          <Route path="/" element={<PrivateComponent />}>
            {/* Nested route for home page */}
            <Route path="/home" element={<HomePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
};
export default App;
