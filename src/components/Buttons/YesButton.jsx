import { CheckCheck } from "lucide-react";
import { usePostContext } from "../../providers/PostContext";

export const YesButton = ({ textButton, setIsModalOpenDelete, postDelete }) => {
  console.log(postDelete);
  const { deletePost } = usePostContext();
  const deletePostById = () => {
    deletePost(postDelete);
    setIsModalOpenDelete(false);
  };
  return (
    <>
      <button
        onClick={() => {
          deletePostById();
        }}
        className="btn bg-lime-500 hover:bg-lime-900 text-white"
      >
        <CheckCheck />
        <span className="hidden xs:block ml-2">Confirmar {textButton}</span>
      </button>
    </>
  );
};
