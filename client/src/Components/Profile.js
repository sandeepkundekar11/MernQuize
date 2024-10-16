// 'use client' directive
"use client";

// Importing useState from 'react'
import { useState } from "react";

// Profile component definition
export default function Profile() {
  // State variables for editing mode, username, and bio
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    firstname: "Sandeep",
    lastname: "kundekar",
    bio: "I am a web developer and a competitive programmer and a good learner",
    image: "",
  });
  const [imageUrl, setImageUrl] = useState("");

  // Function to handle saving changes
  const handleSave = () => {
    // Placeholder for backend integration
    // Here you would typically save the changes to a backend
    setIsEditing(false);
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setUserInfo({ ...userInfo, image: file });
    const url = URL.createObjectURL(file);
    setImageUrl(url);
  };
  const userQuizzes = [
    { id: 1, title: "World Capitals", questions: 15, plays: 230 },
    { id: 2, title: "Famous Scientists", questions: 20, plays: 185 },
    { id: 3, title: "Movie Trivia", questions: 25, plays: 312 },
    { id: 4, title: "Ancient History", questions: 18, plays: 97 },
  ];
  // Component return JSX
  return (
    // Main container with minimum height and padding
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8 pt-20">
      {/* // Container for profile content with shadow and rounded corners */}
      <div className="md:w-11/12 w-full mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        {/* // Padding inside the profile container */}
        <div className="p-8">
          {/* // Header section with title and edit/save button */}
          <div className="flex items-center justify-between mb-6">
            {/* // Profile title */}
            <h1 className="text-3xl text-center font-bold text-gray-900">
              Profile
            </h1>
            {/* // Button to toggle between edit and save */}
            <button
              onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              {/* // Conditional rendering based on editing state */}
              {isEditing ? (
                // Save button with icon
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Save
                </>
              ) : (
                // Edit button with icon
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                  Edit
                </>
              )}
            </button>
          </div>

          {/* // Profile image and user information section */}

          <div className="flex flex-col sm:flex-row items-center sm:items-start mb-8">
            {/* // Profile image */}
            <div>
              <img
                src={imageUrl}
                alt="Profile"
                className="w-32 h-32 rounded-full mb-4 sm:mb-0 sm:mr-8 border-2 border-gray-300"
              />
              {isEditing && (
                <div className="relative mt-4">
                  <button className="mb-4 w-32 bg-blue-600 text-white h-10 border border-gray-300 rounded-md absolute top-0 left-0">
                    Upload
                  </button>
                  <input
                    type="file"
                    onChange={handleImageChange}
                    className="mb-4 w-32 h-10 border border-gray-300 rounded-md absolute opacity-0 top-0 left-0"
                  />
                </div>
              )}
            </div>
            {/* // Username and bio section */}
            <div className="flex-grow">
              {/* // Conditional rendering for editing username */}
              <div className="flex space-x-3">
                {/* first name */}
                {isEditing ? (
                  <input
                    type="text"
                    value={userInfo.firstname}
                    placeholder="Enter First Name"
                    onChange={(e) =>
                      setUserInfo({ ...userInfo, firstname: e.target.value })
                    }
                    className="text-xl font-semibold mb-2 w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <h2 className="text-2xl font-semibold mb-2">
                    {userInfo.firstname}
                  </h2>
                )}
                {/*  Last name*/}

                {isEditing ? (
                  <input
                    type="text"
                    value={userInfo.lastname}
                    placeholder="Enter Last Name"
                    onChange={(e) => {
                      setUserInfo({ ...userInfo, lastname: e.target.value });
                    }}
                    className="text-xl font-semibold mb-2 w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <h2 className="text-2xl font-semibold mb-2">
                    {userInfo.lastname}
                  </h2>
                )}
              </div>
              {/* // Conditional rendering for editing bio */}
              {isEditing ? (
                <textarea
                  value={userInfo.bio}
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, bio: e.target.value })
                  }
                  className="text-gray-600 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="3"
                />
              ) : (
                <p className="text-gray-600">{userInfo.bio}</p>
              )}
            </div>
          </div>

          {/* // Statistics section with grid layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">
                Total Quizzes Taken
              </h3>
              <p className="text-3xl font-bold text-blue-600">42</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Average Score</h3>
              <p className="text-3xl font-bold text-green-600">85%</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Highest Score</h3>
              <p className="text-3xl font-bold text-purple-600">98%</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Quizzes Created</h3>
              <p className="text-3xl font-bold text-orange-600">
                {userQuizzes.length}
              </p>
            </div>
          </div>
          {/* // Your Quizzes section */}
          <div className="mt-10">
            <h3 className="text-2xl font-semibold mb-4">Your Quizzes</h3>
            <div className="bg-gray-50 rounded-lg overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Quiz Title
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Questions
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Plays
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {userQuizzes.map((quiz) => (
                    <tr key={quiz.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {quiz.title}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {quiz.questions}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {quiz.plays}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
