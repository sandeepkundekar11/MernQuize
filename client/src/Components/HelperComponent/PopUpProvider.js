import { memo } from "react";

const PopUpProvider = ({ children }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50  poupContainer">
            <div className="">
                {children}
            </div>
        </div>
    )
}

export default memo(PopUpProvider);