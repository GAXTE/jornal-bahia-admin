import { CheckCheck } from "lucide-react";
import { usePostContext } from "../../providers/PostContext";

export const YesButton = ({ textButton, type, onConfirm }) => {
  return (
    <>
      <button
        type={type}
        onClick={() => {
          if (typeof onConfirm === "function") {
            onConfirm();
          }
        }}
        className="btn bg-lime-500 hover:bg-lime-900 text-white w-full sm:w-auto px-3 py-2 text-sm sm:text-base min-h-[40px] sm:min-h-[36px]"
      >
        <CheckCheck className="w-4 h-4 sm:w-5 sm:h-5" />
        <span className="hidden xs:block ml-1 sm:ml-2">{textButton}</span>
      </button>
    </>
  );
};
