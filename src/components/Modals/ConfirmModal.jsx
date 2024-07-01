import { NoButton } from "../Buttons/NoButton";
import { YesButton } from "../Buttons/YesButton";
import { DefaultModal } from "./DefaultModal";

export const ConfirmModal = ({
  isModalOpenDelete,
  setIsModalOpenDelete,
  children,
  postDelete,
}) => {
  return (
    <>
      <DefaultModal
        isModalOpen={isModalOpenDelete}
        setIsModalOpen={setIsModalOpenDelete}
      >
        <div className="flex flex-col items-center w-[250px] h-[100px] gap-6">
          <h1 className="text-lg ">Confirmar a exclusão ?</h1>
          <div className="flex gap-3">
            <YesButton
              postDelete={postDelete}
              textButton={"Deletar"}
              setIsModalOpenDelete={setIsModalOpenDelete}
            />
            <NoButton />
          </div>
        </div>
        {children}
      </DefaultModal>
    </>
  );
};
