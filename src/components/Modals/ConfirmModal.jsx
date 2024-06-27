import { DefaultModal } from "./DefaultModal";

export const ConfirmModal = ({
  isModalOpenDelete,
  setIsModalOpenDelete,
  children,
}) => {
  return (
    <>
      <DefaultModal
        isModalOpen={isModalOpenDelete}
        setIsModalOpen={setIsModalOpenDelete}
      >
        <div>
          <h1>Confirmar a exclusão ?</h1>
          <button>Sim</button>
          <button>Não</button>
        </div>
        {children}
      </DefaultModal>
    </>
  );
};
