import { CheckCheck } from "lucide-react";
import { usePostContext } from "../../providers/PostContext";

export const YesButton = ({ textButton, type, onConfirm }) => {
  return (
    <>
      <button
        type={type}
        onClick={() => {
          onConfirm();
        }}
        className="btn bg-lime-500 hover:bg-lime-900 text-white"
      >
        <CheckCheck />
        <span className="hidden xs:block ml-2">{textButton}</span>
      </button>
    </>
  );
};
