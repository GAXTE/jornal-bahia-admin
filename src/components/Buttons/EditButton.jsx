import editIcon from "../../assets/pencil.svg";

export const Edit = ({ isModalEdit, setIsModalEdit }) => {
  return (
    <>
      <button onClick={() => setIsModalEdit(true)}>
        <img
          className="opacity-40 h-[15px] cursor-pointer hover:opacity-100 transition-opacity"
          src={editIcon}
          alt=""
        />
      </button>
    </>
  );
};
