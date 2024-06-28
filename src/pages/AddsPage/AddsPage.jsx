import { useState } from "react";
import { DefaultTemplate } from "../DefaultTemplate/DefaultTemplate";
import { AddsList } from "../../components/Tables/AddsList";
import { usePublicityContext } from "../../providers/PublicityContext";

export const AddsPage = () => {
  const [isModalOpenCreate, setIsModalOpenCreate] = useState(false);
  const { ListAllPublicity } = usePublicityContext();
  return (
    <>
      <DefaultTemplate textButton={"Propaganda"} setIsModalOpenCreate={setIsModalOpenCreate}>
        <AddsList array={ListAllPublicity} />
      </DefaultTemplate>
    </>
  );
};
