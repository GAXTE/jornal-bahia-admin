export const CreateButton = ({ textButton, setIsModalOpenCreate, style }) => {
  return (
    <>
      <button
        onClick={() => setIsModalOpenCreate(true)}
        className="btn bg-red-500 hover:bg-red-900 text-white w-full sm:w-auto px-3 py-2 text-sm sm:text-base min-h-[40px] sm:min-h-[36px]"
        style={style}
      >
        <svg
          className="w-4 h-4 sm:w-5 sm:h-5 fill-current opacity-50 shrink-0"
          viewBox="0 0 16 16"
        >
          <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
        </svg>
        <span className="hidden xs:block ml-1 sm:ml-2">Adicionar {textButton}</span>
      </button>
    </>
  );
};
