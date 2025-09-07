import editIcon from "../../assets/pencil.svg";

export const Edit = ({ handleEditClick }) => {
  return (
    <>
      <button 
        onClick={handleEditClick}
        className="p-1 sm:p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded transition-colors"
      >
        <img
          className="opacity-40 h-[15px] sm:h-[18px] cursor-pointer hover:opacity-100 transition-opacity"
          src={editIcon}
          alt="Editar"
        />
      </button>
    </>
  );
};
