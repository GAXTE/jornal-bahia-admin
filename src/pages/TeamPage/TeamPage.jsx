import { useState } from "react";
import { TeamList } from "../../components/Tables/TeamList";
import { DefaultTemplate } from "../DefaultTemplate/DefaultTemplate";
import { useUserContext } from "../../providers/UserContext";

export const TeamPage = () => {
  const [isModalOpenCreate, setIsModalOpenCreate] = useState(false);
  const { ListAllUsers } = useUserContext();
  return (
    <>
      <DefaultTemplate textButton={"Membro"} setIsModalOpenCreate={setIsModalOpenCreate}>
        <TeamList array={ListAllUsers} />
      </DefaultTemplate>
    </>
  );
};
