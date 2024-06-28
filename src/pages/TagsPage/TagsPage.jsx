import { useState } from "react";
import { TagsList } from "../../components/Tables/TagsList";
import { DefaultTemplate } from "../DefaultTemplate/DefaultTemplate";
import { useTagsContext } from "../../providers/TagsContext";

export const TagsPage = () => {
  const [isModalOpenCreate, setIsModalOpenCreate] = useState(false);
  const { ListAlltags } = useTagsContext();
  return (
    <>
      <DefaultTemplate textButton={"Tag"} setIsModalOpenCreate={setIsModalOpenCreate}>
        <TagsList array={ListAlltags} />
      </DefaultTemplate>
    </>
  );
};
