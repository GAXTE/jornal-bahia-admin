import { useState } from "react";
import { TagsList } from "../../components/Tables/TagsList";
import { DefaultTemplate } from "../DefaultTemplate/DefaultTemplate";

export const TagsPage = () => {
  const [isModalOpenCreate, setIsModalOpenCreate] = useState(false);
  return (
    <>
      <DefaultTemplate
        textButton={"Tag"}
        setIsModalOpenCreate={setIsModalOpenCreate}
      >
        <TagsList array={[]} />
      </DefaultTemplate>
    </>
  );
};
