import trashIcon from "../../assets/trash-2.svg";

export const Trash = ({ isModalOpenDelete, setIsModalOpenDelete }) => {
  return (
    <>
      <button
        onClick={() => {
          setIsModalOpenDelete(true);
        }}
      >
        <img
          className="opacity-40 h-[15px] cursor-pointer hover:opacity-100 transition-opacity"
          src={trashIcon}
          alt=""
        />
      </button>
    </>
  );
};
