import { createContext, useContext, useEffect, useState } from "react";
import { Api } from "../services/api";

const PostContext = createContext({});

export const PostProvider = ({ children }) => {
  const [AllPosts, setGetAllPosts] = useState([]);
  const [postMostView, setPostMostView] = useState(0);

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
    } catch (error) {
      console.log(error);
    }
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
    } catch (error) {
      console.log(error);
    }
  };

  const editPost = async (post, id) => {
    try {
      if (!post.title || !post.content) {
        console.log("Todos os campos são necessários");
        return;
      }
      const { data } = await Api.put(`/post/${id}`, post);
    } catch (error) {
      console.log(error);
    }
  };

  const deletePost = async (id) => {
    const token = localStorage.getItem("token");
    try {
      if (!id) {
        console.log("ID é necessário");
        return;
      }
      const { data } = await Api.delete(`/post/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      sessionStorage.setItem("allPosts", "");
      getAllPosts();
    } catch (error) {
      console.log(error);
    }
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

  const postMostViews = async () => {
    try {
      const { data } = await Api.get("/filter/post/views");
      const totalViews = data.reduce((sum, post) => sum + post.post_view_count, 0);
      setPostMostView(totalViews);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllPosts();
    postMostViews();
  }, []);

  return (
    <PostContext.Provider
      value={{ createPost, getAllPosts, AllPosts, deletePost, updatePost, postMostViews, postMostView }}
    >
      {children}
    </PostContext.Provider>
  );
};

export const usePostContext = () => useContext(PostContext);
