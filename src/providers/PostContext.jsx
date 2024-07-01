import { createContext, useContext, useEffect, useState } from "react";
import { Api } from "../services/api";

const PostContext = createContext({});

export const PostProvider = ({ children }) => {
  const [AllPosts, setGetAllPosts] = useState([]);
  const [postMostState, setPostMostState] = useState();
  const createPost = async (post) => {
    const { title, content, categoryId, tagIds, files } = post;
    try {
      if (!title || !content || !categoryId || !tagIds.length) {
        console.log("Todos os campos são necessários");
        return;
      }
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      formData.append("categoryId", categoryId);

      const tagsToAppend = tagIds.length === 1 ? [tagIds[0], tagIds[0]] : tagIds;
      tagsToAppend.forEach((tagId) => formData.append("tagIds", tagId));

      if (files?.length) {
        for (let i = 0; i < files.length; i++) {
          formData.append("files", files[i]);
        }
      }
      const { data } = await Api.post("/post", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      sessionStorage.setItem("allPosts", "");
      getAllPosts();
    } catch (error) {}
  };
  const getAllPosts = async () => {
    const cachedPosts = sessionStorage.getItem("allPosts");
    const lastFetchTime = sessionStorage.getItem("allPostsFetchTime");

    const tenMinutes = 5 * 60 * 1000;
    const now = new Date().getTime();

    if (cachedPosts && lastFetchTime && now - parseInt(lastFetchTime) < tenMinutes) {
      setGetAllPosts(JSON.parse(cachedPosts));
      return;
    }

    try {
      const { data } = await Api.get("/post");
      data.reverse();
      sessionStorage.setItem("allPosts", JSON.stringify(data));
      sessionStorage.setItem("allPostsFetchTime", now.toString());

      setGetAllPosts(data);
    } catch (error) {}
  };
  const editPost = async (post, id) => {
    try {
      if (!title || !content) {
        console.log("todos os campos sao necessarios");
        return;
      }
      const { data } = await Api.put(`/post/${id}`, {
        post,
      });
    } catch (error) {}
  };
  const deletePost = async (id) => {
    const token = localStorage.getItem("token");
    try {
      if (!id) {
        console.log("id e necessario");
        return;
      }
      const { data } = await Api.delete(`/post/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      sessionStorage.setItem("allPosts", "");
      getAllPosts();
    } catch (error) {}
  };
  const updatePost = async (id, post) => {
    try {
      const { data } = await Api.put(`/post/${id}`, post);
      sessionStorage.setItem("allPosts", "");
      getAllPosts();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllPosts();
  }, []);
  return (
    <PostContext.Provider value={{ createPost, getAllPosts, AllPosts, deletePost, updatePost }}>
      {children}
    </PostContext.Provider>
  );
};

export const usePostContext = () => useContext(PostContext);
