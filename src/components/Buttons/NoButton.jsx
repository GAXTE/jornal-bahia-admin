import { CircleAlert } from "lucide-react";

export const NoButton = ({ textButton, setIsModalOpenCreate }) => {
  return (
    <>
      <button
        onClick={() => setIsModalOpenCreate(true)}
        className="btn bg-red-500 hover:bg-red-900 text-white w-full sm:w-auto px-3 py-2 text-sm sm:text-base min-h-[40px] sm:min-h-[36px]"
      >
        <CircleAlert className="w-4 h-4 sm:w-5 sm:h-5" />
        <span className="hidden xs:block ml-1 sm:ml-2">Cancelar {textButton}</span>
      </button>
    </>
  );
};
