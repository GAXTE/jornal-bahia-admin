import { createContext, useContext, useEffect, useState } from "react";
import { Api } from "../services/api";
import { toast } from "react-toastify";

const PostContext = createContext({});

export const PostProvider = ({ children }) => {
  const [AllPosts, setGetAllPosts] = useState([]);
  const [postMostView, setPostMostView] = useState(0);

  const createPost = async (post) => {
    const { title, content, categoryId, tagIds, files } = post;

    if (!title || !content || !categoryId || !tagIds.length) {
      toast.warning("Todos os campos são obrigatórios");
      throw new Error("Todos os campos são obrigatórios");
    }

    if (files && files.name && /\s/.test(files.name)) {
      toast.warning("O nome do arquivo não deve conter espaços");
      throw new Error("O nome do arquivo não deve conter espaços");
    }

    const createPromise = async () => {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      formData.append("categoryId", categoryId);

      const tagsToAppend =
        tagIds.length === 1 ? [tagIds[0], tagIds[0]] : tagIds;
      tagsToAppend.forEach((tagId) => formData.append("tagIds", tagId));

      if (files && files.name) {
        formData.append("files", files);
      } else {
      }

      const { data } = await Api.post("/post", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      sessionStorage.setItem("allPosts", "");
      getAllPosts();
      return data;
    };

    toast.promise(createPromise(), {
      pending: "Criando post...",
      success: "Post criado com sucesso!",
      error: {
        render({ data }) {
          console.log(data.response.data);
          return data.message || "Erro ao criar o post";
        },
      },
    });
  };

  const deletePost = async (id) => {
    const token = localStorage.getItem("token");

    const deletePromise = async () => {
      if (!id) {
        throw new Error("ID é necessário");
      }
      const { data } = await Api.delete(`/post/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      sessionStorage.setItem("allPosts", "");
      getAllPosts();
      return data;
    };

    toast.promise(deletePromise(), {
      pending: "Deletando post...",
      success: "Post deletado com sucesso!",
      error: {
        render({ data }) {
          return data.message || "Erro ao deletar o post";
        },
      },
    });
  };

  const updatePost = async (id, post) => {
    if (!post.title || !post.content) {
      toast.error("Todos os campos são necessários");
      throw new Error("Todos os campos são necessários");
    }

    const updatePromise = async () => {
      const { data } = await Api.put(`/post/${id}`, post, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      sessionStorage.setItem("allPosts", "");
      getAllPosts();
      return data;
    };

    toast.promise(updatePromise(), {
      pending: "Atualizando post...",
      success: "Post atualizado com sucesso!",
      error: {
        render({ data }) {
          return data.message || "Erro ao atualizar o post";
        },
      },
    });
  };

  const getAllPosts = async () => {
    // const cachedPosts = sessionStorage.getItem("allPosts");
    // const lastFetchTime = sessionStorage.getItem("allPostsFetchTime");

    // const tenMinutes = 10 * 60 * 1000;
    // const now = new Date().getTime();

    // if (
    //   cachedPosts &&
    //   lastFetchTime &&
    //   now - parseInt(lastFetchTime) < tenMinutes
    // ) {
    //   setGetAllPosts(JSON.parse(cachedPosts));
    //   return;
    // }

    try {
      const { data } = await Api.get("/post");
      data.reverse();
      // sessionStorage.setItem("allPosts", JSON.stringify(data));
      // sessionStorage.setItem("allPostsFetchTime", now.toString());

      setGetAllPosts(data);
    } catch (error) {
      console.log(error);
    }
  };

  const postMostViews = async () => {
    try {
      const { data } = await Api.get("/filter/post/views");
      const totalViews = data.reduce(
        (sum, post) => sum + post.post_view_count,
        0
      );
      setPostMostView(totalViews);
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    getAllPosts();
    postMostViews();
  }, []);

  return (
    <PostContext.Provider
      value={{
        createPost,
        getAllPosts,
        AllPosts,
        deletePost,
        updatePost,
        postMostViews,
        postMostView,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export const usePostContext = () => useContext(PostContext);
