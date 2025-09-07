import { useEffect, useState } from "react";
import { TeamList } from "../../components/Tables/TeamList";
import { DefaultTemplate } from "../DefaultTemplate/DefaultTemplate";
import { useUserContext } from "../../providers/UserContext";
import { DefaultModal } from "../../components/Modals/DefaultModal";
import { DefaultInput } from "../../components/Inputs/DefaultInput";
import { SelectInput } from "../../components/Inputs/SelectInput";
import { YesButton } from "../../components/Buttons/YesButton";

export const TeamPage = () => {
  const [isModalOpenCreate, setIsModalOpenCreate] = useState(false);
  const [formValues, setFormValues] = useState({
    username: "",
    email: "",
    password: "",
    roleId: "",
  });
  const { ListAllUsers, roleList, createUser, listAllUsers, listAllRoles } = useUserContext();
  useEffect(() => {
    listAllUsers();
    listAllRoles();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createUser(formValues)
      .then(() => {
        setIsModalOpenCreate(false);
        formValues.username = "";
        formValues.email = "";
        formValues.password = "";
        formValues.roleId = "";
      })
      .catch((error) => {
        formValues.username = "";
        formValues.email = "";
        formValues.password = "";
        formValues.roleId = "";
      });
  };

  return (
    <>
      <DefaultTemplate textButton={"Membro"} setIsModalOpenCreate={setIsModalOpenCreate}>
        <DefaultModal isModalOpen={isModalOpenCreate} setIsModalOpen={setIsModalOpenCreate}>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4 sm:gap-6 items-center w-full">
              <DefaultInput
                type={"text"}
                placeholder={"Nome completo"}
                handleInputChange={handleInputChange}
                name={"username"}
              />
              <DefaultInput
                type={"email"}
                placeholder={"Email"}
                handleInputChange={handleInputChange}
                name={"email"}
              />
              <DefaultInput
                type={"password"}
                placeholder={"Senha"}
                handleInputChange={handleInputChange}
                name={"password"}
              />
              <SelectInput
                name1={"roleId"}
                placeholder={"Escolha uma função"}
                array={roleList}
                handleInputChange={handleInputChange}
              />
              <YesButton textButton={"Enviar"} type={"Submit"} />
            </div>
          </form>
        </DefaultModal>
        <TeamList array={ListAllUsers} />
      </DefaultTemplate>
    </>
  );
};
