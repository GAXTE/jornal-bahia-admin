import { useState } from "react";
import { DefaultTemplate } from "../DefaultTemplate/DefaultTemplate";
import { AddsList } from "../../components/Tables/AddsList";

export const AddsPage = () => {
  const [isModalOpenCreate, setIsModalOpenCreate] = useState(false);
  return (
    <>
      <DefaultTemplate
        textButton={"Propaganda"}
        setIsModalOpenCreate={setIsModalOpenCreate}
      >
        <AddsList array={[]} />
      </DefaultTemplate>
    </>
  );
};
