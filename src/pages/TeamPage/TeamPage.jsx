import { useState } from "react";
import { TeamList } from "../../components/Tables/TeamList";
import { DefaultTemplate } from "../DefaultTemplate/DefaultTemplate";

export const TeamPage = () => {
  const [isModalOpenCreate, setIsModalOpenCreate] = useState(false);
  return (
    <>
      <DefaultTemplate
        textButton={"Membro"}
        setIsModalOpenCreate={setIsModalOpenCreate}
      >
        <TeamList array={[]} />
      </DefaultTemplate>
    </>
  );
};
