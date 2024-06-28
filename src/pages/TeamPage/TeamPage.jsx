import { useState } from "react";
import { TeamList } from "../../components/Tables/TeamList";
import { DefaultTemplate } from "../DefaultTemplate/DefaultTemplate";
import { useUserContext } from "../../providers/UserContext";
import { DefaultModal } from "../../components/Modals/DefaultModal";
import { DefaultInput } from "../../components/Inputs/DefaultInput";
import { SelectInput } from "../../components/Inputs/SelectInput";

export const TeamPage = () => {
  const [isModalOpenCreate, setIsModalOpenCreate] = useState(false);
  const { ListAllUsers } = useUserContext();
  return (
    <>
      <DefaultTemplate textButton={"Membro"} setIsModalOpenCreate={setIsModalOpenCreate}>
        textButton={"Membro"}
        setIsModalOpenCreate={setIsModalOpenCreate}
      >
        <DefaultModal
          isModalOpen={isModalOpenCreate}
          setIsModalOpen={setIsModalOpenCreate}
        >
          <form action="">
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
              // handleInputChange={handleInputChange}
            />
          </form>
        </DefaultModal>
        <TeamList array={ListAllUsers} />
      </DefaultTemplate>
    </>
  );
};
