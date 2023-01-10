import { createBrowserRouter } from "react-router-dom";
import Search from "../components/Search";
import { createPostAction } from "../pages/actions/create";
import Home from "../pages/Home";
import NewPost from "../pages/NewPost";
import Post from "../pages/Post";

const router = createBrowserRouter([
  {
    index: true,
    element: <Home />,
  },
  {
    path: "/create",
    action: createPostAction,
  },{
    path: "/search",
    action: Search.searchAction,
  },
  {
    path: "/post/:postId",
    element: <Post />,
    loader: Post.loader,
  },
  {
    path: "/post/create/new",
    element: <NewPost />,
    action: NewPost.newPostAction,
  },
  {
    path: "/post/:postId/like",
    action: Post.likeAction,
  },
]);

export default router;
