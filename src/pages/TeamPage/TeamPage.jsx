import { useState } from "react";
import { TeamList } from "../../components/Tables/TeamList";
import { DefaultTemplate } from "../DefaultTemplate/DefaultTemplate";
import { useUserContext } from "../../providers/UserContext";
import { DefaultModal } from "../../components/Modals/DefaultModal";
import { DefaultInput } from "../../components/Inputs/DefaultInput";
import { SelectInput } from "../../components/Inputs/SelectInput";

export const TeamPage = () => {
  const [isModalOpenCreate, setIsModalOpenCreate] = useState(false);
  const [formValues, setFormValues] = useState({
    username: "",
    email: "",
    password: "",
    roleId: "",
  });
  const { ListAllUsers, roleList, createUser } = useUserContext();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createUser(formValues);
  };

  return (
    <>
      <DefaultTemplate textButton={"Membro"} setIsModalOpenCreate={setIsModalOpenCreate}>
        <DefaultModal isModalOpen={isModalOpenCreate} setIsModalOpen={setIsModalOpenCreate}>
          <form onSubmit={handleSubmit}>
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
            <SelectInput name1={"roleId"} array={roleList} handleInputChange={handleInputChange} />
            <button type="submit">Enviar</button>
          </form>
        </DefaultModal>
        <TeamList array={ListAllUsers} />
      </DefaultTemplate>
    </>
  );
};
