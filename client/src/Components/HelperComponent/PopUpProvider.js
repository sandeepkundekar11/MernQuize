import { memo } from "react";

const PopUpProvider = ({ children }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50  poupContainer">
            <div className="md:w-[800px]  w-[400px] h-auto bg-white rounded-md shadow-md">
                {children}
            </div>
        </div>
    )
}

export default memo(PopUpProvider);