import { memo } from "react";

const NavigationBar = () => {
  return (
    <div className="w-screen h-16 fixed top-0 bg-gray-800 cursor-pointer">
      <div className="w-11/12 m-auto flex h-16 items-center justify-between">
        <div className="flex ">
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
        {/*  */}
        <div>
          <ul className="flex items-center space-x-4 text-sm">
            <li className="text-white">Home</li>
            <li className="text-white">Leaderboard</li>
            <li className="text-white bg-blue-500 px-4 py-2 rounded-md cursor-pointer hover:bg-blue-600">Create Quiz</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default memo(NavigationBar);
