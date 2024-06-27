import { CircleAlert } from "lucide-react";

export const NoButton = ({ textButton, setIsModalOpenCreate }) => {
  return (
    <>
      <button
        onClick={() => setIsModalOpenCreate(true)}
        className="btn bg-red-500 hover:bg-red-900 text-white"
      >
        <CircleAlert />
        <span className="hidden xs:block ml-2">Cancelar {textButton}</span>
      </button>
    </>
  );
};
