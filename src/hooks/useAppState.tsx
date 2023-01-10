import React from "react";
import api from "../api/api";

const useAppSate = () => {
  const {
    posts,
    getPostById,
    getPosts,
    createPost,
    searchPosts,
    updatePostById,
    deletePostById,
  } = api;

  React.useEffect(() => {}, [posts]);
  return {
    posts,
    getPostById,
    getPosts,
    createPost,
    searchPosts,
    updatePostById,
    deletePostById,
  };
};

export default useAppSate;
