import { NoButton } from "../Buttons/NoButton";
import { YesButton } from "../Buttons/YesButton";
import { DefaultModal } from "./DefaultModal";

export const ConfirmModal = ({ isModalOpenDelete, setIsModalOpenDelete, onConfirm, children }) => {
  return (
    <DefaultModal isModalOpen={isModalOpenDelete} setIsModalOpen={setIsModalOpenDelete}>
      <div className="flex flex-col items-center w-full max-w-xs sm:max-w-sm min-h-[100px] gap-4 sm:gap-6 p-2">
        <h1 className="text-base sm:text-lg text-center">Confirmar a exclusão?</h1>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
          <YesButton
            onConfirm={onConfirm}
            setIsModalOpenDelete={setIsModalOpenDelete}
            textButton={"Deletar"}
          />
          <NoButton />
        </div>
      </div>
      {children}
    </DefaultModal>
  );
};
