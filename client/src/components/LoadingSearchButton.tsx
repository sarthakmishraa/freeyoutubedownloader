import { FaSearch } from "react-icons/fa";

export const LoadingSearchButton = () => {
    return(
        <button
            disabled
            className="animate-bounce cursor-not-allowed text-[#1a3353] bg-[#e6f1ff] text-xl p-2 m-1 border-2 border-[#b1bac9] rounded-md transition-all"
        >
            <div className="flex flex-row items-center space-x-1">
                <p>Finding...</p>
                <FaSearch />
            </div>
        </button>
    )
}