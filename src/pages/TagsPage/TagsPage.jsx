import { useState } from "react";
import { TagsList } from "../../components/Tables/TagsList";
import { DefaultTemplate } from "../DefaultTemplate/DefaultTemplate";
import { useTagsContext } from "../../providers/TagsContext";
import { DefaultModal } from "../../components/Modals/DefaultModal";
import { DefaultInput } from "../../components/Inputs/DefaultInput";

export const TagsPage = () => {
  const [isModalOpenCreate, setIsModalOpenCreate] = useState(false);
  const { ListAlltags } = useTagsContext();
  return (
    <>
      <DefaultTemplate textButton={"Tag"} setIsModalOpenCreate={setIsModalOpenCreate}>
        textButton={"Tag"}
        setIsModalOpenCreate={setIsModalOpenCreate}
        <DefaultModal isModalOpen={isModalOpenCreate} setIsModalOpen={setIsModalOpenCreate}>
          <form action="">
            <DefaultInput
              type={"text"}
              placeholder={"Nome da tag"}
              // handleInputChange={handleInputChange}
              name={"name"}
            />
          </form>
        </DefaultModal>
        <TagsList array={ListAlltags} />
      </DefaultTemplate>
    </>
  );
};
