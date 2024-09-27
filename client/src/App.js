import React, { Suspense } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePageLoadingSkeleton from "./Components/HelperComponent/HomePageLoadingSkeleton";
const LoginPage = React.lazy(() => import("./Components/Loginpage"))
const SignupPage = React.lazy(() => import("./Components/SignupPage"))
const HomePage = React.lazy(() => import("./Components/HomePage"))
const AddQuizepage = React.lazy(() => import("./Components/AddQuizepage"))
const PrivateComponent = React.lazy(() => import("./PrivateComponent"))
const App = () => {
  return (
    <Suspense fallback={<HomePageLoadingSkeleton />}>
      <BrowserRouter>
        <Routes>
          {/* Route for login page */}
          <Route path="/login" element={<LoginPage />} />
          {/* Route for signup page */}
          <Route path="/signup" element={<SignupPage />} />
          {/* Private route for authenticated users */}
          <Route path="/" element={<PrivateComponent />}>
            {/* Nested route for home page */}
            <Route path="/" element={<HomePage />} />
            <Route path="/addquiz" element={<AddQuizepage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
};
export default App;
