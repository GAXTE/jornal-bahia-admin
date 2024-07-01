import { CheckCheck } from "lucide-react";
import { usePostContext } from "../../providers/PostContext";

export const YesButton = ({ onConfirm }) => {
  return (
    <button
      onClick={() => {
        onConfirm();
      }}
      className="btn bg-lime-500 hover:bg-lime-900 text-white"
    >
      <CheckCheck />
      <span className="hidden xs:block ml-2">Confirmar</span>
    </button>
  );
};
