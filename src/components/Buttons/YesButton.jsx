import { CheckCheck } from "lucide-react";

export const YesButton = ({ textButton, setIsModalOpenCreate }) => {
  return (
    <>
      <button
        onClick={() => setIsModalOpenCreate(true)}
        className="btn bg-lime-500 hover:bg-lime-900 text-white"
      >
        <CheckCheck />
        <span className="hidden xs:block ml-2">Confirmar {textButton}</span>
      </button>
    </>
  );
};
