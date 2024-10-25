
// Importing useState from 'react'
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfileApi, UpdateProfileApiCall } from "../Redux/Actions/UserAction";
import Loader from "./HelperComponent/Loader";
import ProfileImage from "./HelperComponent/ProfilleImage";
// Profile component definition
export default function Profile() {
  const Dispatch = useDispatch()
  const { user, userLoading, userError } = useSelector((state) => state.userProfile)
  const { updateMsg, updateLoading, updateprofileError } = useSelector((state) => state.updateProfile)
  // State variables for editing mode, username, and bio
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    bio: "",
    image: null,
    CreatedQuiz: 0,
    TotalQuizAttended: 0,
    CreatedQuizes: [],
    message: ""
  });
  const [imageUrl, setImageUrl] = useState("");

  // Function to handle saving changes
  const handleSave = () => {
    // Placeholder for backend integration
    // Here you would typically save the changes to a backend

    const formData = new FormData()
    formData.append("firstName", userInfo.firstName)
    formData.append("lastName", userInfo.lastName)
    formData.append("bio", userInfo.bio)
    formData.append("profile", userInfo.image)

    // if message is "remove" then profile image will be removed
    formData.append("message", userInfo.message)
    Dispatch(UpdateProfileApiCall(formData, () => {
      // ones profile updated get profile api we are calling
      Dispatch(getUserProfileApi())
      setIsEditing(false);
      setUserInfo({
        ...userInfo,
        message: ""
      })
    }))

  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const url = URL.createObjectURL(file);
    setImageUrl(url);
    setUserInfo({ ...userInfo, image: file });
  };


  useEffect(() => {
    Dispatch(getUserProfileApi())
  }, [])

  // setting to states
  useEffect(() => {
    setUserInfo({
      firstName: user?.firstName,
      lastName: user?.lastName,
      image: user?.image || null,
      bio: user?.bio || "",
      CreatedQuiz: user?.createdQuizes?.length,
      TotalQuizAttended: user?.joinedQuizes?.length,
      CreatedQuizes: user?.createdQuizes,
    })
  }, [user])

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
            <div className="flex">
              {
                isEditing && <button onClick={() => {
                  setIsEditing(false)
                  setUserInfo({
                    ...userInfo,
                    message: "",
                    image: user.image
                  })
                }} className="bg-blue-600 rounded-md  w-28 h-10 mr-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">cancel</button>
              }

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
          </div>

          {/* // Profile image and user information section */}

          <div className="flex flex-col sm:flex-row items-center sm:items-start mb-8">
            {/* // Profile image */}
            <div>
              {
                user?.image !== null ? <img
                  src={imageUrl || userInfo.image}
                  alt=""
                  className="w-32 h-32 rounded-full mb-4 sm:mb-0 sm:mr-8 border-2 border-gray-300"
                /> : <ProfileImage user={{
                  firstName: user?.firstName,
                  lastName: user?.lastName,
                }} />
              }

              {isEditing && (<div className="flex">
                <div className="relative mt-2 ">
                  <button className="mb-4 w-20 bg-blue-600 text-white h-8 border border-gray-300 rounded-md absolute top-0 left-0">
                    {userInfo.image ? "update" : "upload"}
                  </button>
                  <input
                    type="file"
                    name="profile"
                    onChange={handleImageChange}
                    className="mb-4 w-20 h-10 border border-gray-300 rounded-md absolute opacity-0 top-0 left-0"
                  />
                </div>

                {
                  // this button is visible till image is available
                  userInfo.image !== null &&
                  <button onClick={() => {
                    setUserInfo({
                      ...userInfo,
                      message: "remove",
                      image: null
                    })

                  }
                  } className="ml-20 mt-2 w-20 bg-red-600 text-white h-8 border border-gray-300 rounded-md">remove</button>
                }

              </div>
              )}
            </div>
            {/* // Username and bio section */}
            <div className="flex-grow">
              {/* // Conditional rendering for editing username */}
              <div className="flex space-x-3 ml-3">
                {/* first name */}
                {isEditing ? (
                  <input
                    type="text"
                    value={userInfo.firstName}
                    placeholder="Enter First Name"
                    onChange={(e) =>
                      setUserInfo({ ...userInfo, firstName: e.target.value })
                    }
                    className="text-xl font-semibold mb-2 w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <h2 className="text-2xl font-semibold mb-2 ml-3">
                    {userInfo.firstName}
                  </h2>
                )}
                {/*  Last name*/}

                {isEditing ? (
                  <input
                    type="text"
                    value={userInfo.lastName}
                    placeholder="Enter Last Name"
                    onChange={(e) => {
                      setUserInfo({ ...userInfo, lastName: e.target.value });
                    }}
                    className="text-xl font-semibold mb-2 w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <h2 className="text-2xl font-semibold mb-2">
                    {userInfo.lastName}
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
                  className="text-gray-600 ml-3 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="3"
                />
              ) : (
                <p className="text-gray-600 ml-6">{userInfo.bio || "User Bio"}</p>
              )}
            </div>
          </div>

          {/* // Statistics section with grid layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">
                Total Quizzes Attended
              </h3>
              <p className="text-3xl font-bold text-blue-600">{userInfo.TotalQuizAttended}</p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Quizzes Created</h3>
              <p className="text-3xl font-bold text-orange-600">
                {userInfo.CreatedQuiz}
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
                  {userInfo?.CreatedQuizes?.map((quiz) => (
                    <tr key={quiz._id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {quiz?.quizeName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {quiz?.quizeQuestions?.length}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {quiz?.quizAttendedBy?.length}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* loaders */}
      {
        (userLoading || updateLoading) && <Loader />
      }
    </div>
  );
}
