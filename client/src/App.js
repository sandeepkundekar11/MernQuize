import React, { Suspense } from "react";
import "./App.css";
import { Provider } from "react-redux";
import store from "./Redux/Store";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePageLoadingSkeleton from "./Components/HelperComponent/HomePageLoadingSkeleton";
const LoginPage = React.lazy(() => import("./Components/Loginpage"));
const SignupPage = React.lazy(() => import("./Components/SignupPage"));
const HomePage = React.lazy(() => import("./Components/HomePage"));
const AddQuizepage = React.lazy(() => import("./Components/AddQuizepage"));
const PrivateComponent = React.lazy(() => import("./PrivateComponent"));
const Leaderboard = React.lazy(() => import("./Components/LeaderBoard"));
const Profile = React.lazy(() => import("./Components/Profile"));
const SubjectQuizzes = React.lazy(() => import("./Components/ViewAllQuizes"));
const AttemptQuizeComponent = React.lazy(() => import("./Components/AttemptQuizeComponent"));
const App = () => {
  return (
    <Suspense fallback={<HomePageLoadingSkeleton />}>
      <Provider store={store}>
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
              {/* Route for add quiz page */}
              <Route path="/addquiz" element={<AddQuizepage />} />
              {/* Route for leaderboard page */}
              <Route path="/leaderboard" element={<Leaderboard />} />
              {/* Route for profile page */}
              <Route path="/profile" element={<Profile />} />
              {/* Route for subject quizzes page */}
              <Route
                path="/subjectquizes/:QuizSubject"
                element={<SubjectQuizzes />}
              />
              <Route path="/attemptquiz" element={<AttemptQuizeComponent />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </Suspense>
  );
};
export default App;
