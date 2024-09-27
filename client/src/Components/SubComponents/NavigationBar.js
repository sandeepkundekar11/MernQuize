import { memo, useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const NavigationBar = () => {
  // State to manage the open/close status of the dropdown menu
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  // Function to handle the click event for toggling the dropdown menu
  const handleClick = () => {
    console.log("clicked");
    setIsOpen(!isOpen);
  };

  // Reference to the navigation bar element
  const navRef = useRef(null);

  // Effect to handle clicks outside the navigation bar to close the dropdown menu
  useEffect(() => {
    // Function to handle clicks outside the navigation bar
    const handleClickOutside = (event) => {
      // Check if the click is outside the navigation bar
      if (navRef.current && !navRef.current.contains(event.target)) {
        // Close the dropdown menu
        setIsOpen(false);
      }
    };
    // Add event listener to detect clicks outside the navigation bar
    document.addEventListener("mousedown", handleClickOutside);
    // Cleanup function to remove the event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="w-screen h-16 fixed top-0 bg-gray-800 cursor-pointer navbar">
      <div className="w-11/12 m-auto flex h-16 items-center justify-between">
        <div className="flex">
          {/* Logo SVG */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            stroke="white"
            className="w-8 h-8"
            fill="white"
          >
            <path d="M19.439 7.85c-.049.322.059.648.289.878l1.568 1.568c.47.47.706 1.087.706 1.704s-.235 1.233-.706 1.704l-1.611 1.611a.98.98 0 0 1-.837.276c-.47-.07-.802-.48-.968-.925a2.501 2.501 0 1 0-3.214 3.214c.446.166.855.497.925.968a.979.979 0 0 1-.276.837l-1.61 1.61a2.404 2.404 0 0 1-1.705.707 2.402 2.402 0 0 1-1.704-.706l-1.568-1.568a1.026 1.026 0 0 0-.877-.29c-.493.074-.84.504-1.02.968a2.5 2.5 0 1 1-3.237-3.237c.464-.18.894-.527.967-1.02a1.026 1.026 0 0 0-.289-.877l-1.568-1.568A2.402 2.402 0 0 1 1.998 12c0-.617.236-1.234.706-1.704L4.23 8.77c.24-.24.581-.353.917-.303.515.077.877.528 1.073 1.01a2.5 2.5 0 1 0 3.259-3.259c-.482-.196-.933-.558-1.01-1.073-.05-.336.062-.676.303-.917l1.525-1.525A2.402 2.402 0 0 1 12 1.998c.617 0 1.234.236 1.704.706l1.568 1.568c.23.23.556.338.877.29.493-.074.84-.504 1.02-.968a2.5 2.5 0 1 1 3.237 3.237c-.464.18-.894.527-.967 1.02Z" />
          </svg>
          <h1 className="text-lg font-bold ml-2 text-white">Quize App</h1>
        </div>
        {/* Navigation Links */}
        <div className="h-auto">
          <ul className="text-sm flex justify-between items-center space-x-4">
            <li className="text-white bg-blue-500 px-4 py-2 rounded-md cursor-pointer hover:bg-blue-600" onClick={() => navigate("/addquiz")}>
              Create Quiz
            </li>
            <li className="text-white text-md relative">
              {/* User Dropdown */}
              <li className="text-white text-lg" onClick={handleClick}>
                Sandeep
              </li>
              {isOpen && (
                <ul
                  ref={navRef}
                  className="text-lg absolute mt-6 text-white bg-gray-800 -ml-10 shadow-md rounded-md p-2 w-40 h-auto"
                >
                  <li
                    className="text-white hover:bg-gray-700 hover:text-white px-4 py-2 rounded-md cursor-pointer"
                    onClick={handleClick}
                  >
                    Home
                  </li>
                  <li
                    className="text-white hover:bg-gray-700 hover:text-white px-4 py-2 rounded-md cursor-pointer"
                    onClick={handleClick}
                  >
                    Leaderboard
                  </li>
                  <li
                    className="text-white hover:bg-gray-700 hover:text-white px-4 py-2 rounded-md cursor-pointer"
                    onClick={handleClick}
                  >
                    Profile
                  </li>
                  <li
                    className="text-white hover:bg-gray-700 hover:text-white px-4 py-2 rounded-md cursor-pointer"
                    onClick={handleClick}
                  >
                    Logout
                  </li>
                </ul>
              )}
            </li>
          </ul>
        </div>
      </div >
    </div >
  );
};

export default memo(NavigationBar);
