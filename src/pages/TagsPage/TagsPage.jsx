import { useState } from "react";
import { TagsList } from "../../components/Tables/TagsList";
import { DefaultTemplate } from "../DefaultTemplate/DefaultTemplate";
import { useTagsContext } from "../../providers/TagsContext";
import { DefaultModal } from "../../components/Modals/DefaultModal";
import { DefaultInput } from "../../components/Inputs/DefaultInput";

export const TagsPage = () => {
  const [isModalOpenCreate, setIsModalOpenCreate] = useState(false);
  const { createTag } = useTagsContext();
  const [name, setName] = useState("");
  const { ListAlltags } = useTagsContext();
  const handleInputChange = (e) => {
    setName(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    createTag(name);
  };
  return (
    <>
      <DefaultTemplate textButton={"Tag"} setIsModalOpenCreate={setIsModalOpenCreate}>
        <DefaultModal isModalOpen={isModalOpenCreate} setIsModalOpen={setIsModalOpenCreate}>
          <form onSubmit={handleSubmit}>
            <DefaultInput
              type={"text"}
              placeholder={"Nome da tag"}
              handleInputChange={handleInputChange}
              name={"name"}
            />
            <button type="submit">oi</button>
          </form>
        </DefaultModal>
        <TagsList array={ListAlltags} />
      </DefaultTemplate>
    </>
  );
};
