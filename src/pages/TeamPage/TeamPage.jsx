import { useState } from "react";
import { TeamList } from "../../components/Tables/TeamList";
import { DefaultTemplate } from "../DefaultTemplate/DefaultTemplate";
import { useUserContext } from "../../providers/UserContext";
import { DefaultModal } from "../../components/Modals/DefaultModal";
import { DefaultInput } from "../../components/Inputs/DefaultInput";
import { SelectInput } from "../../components/Inputs/SelectInput";
import { YesButton } from "../../components/Buttons/YesButton";

export const TeamPage = () => {
  const [isModalOpenCreate, setIsModalOpenCreate] = useState(false);
  const { ListAllUsers } = useUserContext();
  return (
    <>
      <DefaultTemplate
        textButton={"Membro"}
        setIsModalOpenCreate={setIsModalOpenCreate}
      >
        <DefaultModal
          isModalOpen={isModalOpenCreate}
          setIsModalOpen={setIsModalOpenCreate}
        >
          <form action="">
            <div className="flex flex-col gap-6 items-center">
              <DefaultInput
                type={"text"}
                placeholder={"Nome completo"}
                // handleInputChange={handleInputChange}
                name={"name"}
              />
              <DefaultInput
                type={"email"}
                placeholder={"Email"}
                // handleInputChange={handleInputChange}
                name={"email"}
              />
              <DefaultInput
                type={"password"}
                placeholder={"Senha"}
                // handleInputChange={handleInputChange}
                name={"password"}
              />
              <SelectInput
                name1={"role"}
                array={[]}
                placeholder={"Escolha o cargo"}
                // handleInputChange={handleInputChange}
              />
              <YesButton type={"submit"} textButton={"Enviar"} />
            </div>
          </form>
        </DefaultModal>
        <TeamList array={ListAllUsers} />
      </DefaultTemplate>
    </>
  );
};
