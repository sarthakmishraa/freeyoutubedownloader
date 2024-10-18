import { FaCheckCircle } from "react-icons/fa";

export const ValidUrl = () => {
    return(
        <div className="text-xl flex items-center space-x-1">
            <FaCheckCircle size={28} color="lightgreen" />
            <p>URL is valid</p>
        </div>
    )
}