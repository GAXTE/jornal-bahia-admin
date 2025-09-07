import trashIcon from "../../assets/trash-2.svg";

export const Trash = ({ isModalOpenDelete, setIsModalOpenDelete }) => {
  return (
    <>
      <button
        onClick={() => {
          setIsModalOpenDelete(true);
        }}
        className="p-1 sm:p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded transition-colors"
      >
        <img
          className="opacity-40 h-[15px] sm:h-[18px] cursor-pointer hover:opacity-100 transition-opacity"
          src={trashIcon}
          alt="Excluir"
        />
      </button>
    </>
  );
};
