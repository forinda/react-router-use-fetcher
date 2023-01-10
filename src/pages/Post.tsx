import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartHollow } from "@fortawesome/free-regular-svg-icons";
import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  useFetcher,
  useLoaderData,
} from "react-router-dom";
import api from "../api/api";
import { IPostInterface } from "../api/interfaces/Api";

const loader = async ({ params }: LoaderFunctionArgs) => {
  const res = await api.getPostById(params.postId!);
  return res;
};

const likeAction = async ({ request, params }: ActionFunctionArgs) => {

  const formdata = Object.fromEntries(await request.formData());
  
  await api.likePostById(params.postId!);

  return formdata;
};

const Post = () => {
  const fetcher = useFetcher();
  const loaded = useLoaderData() as IPostInterface;
  let liked = loaded.like;
  if (fetcher.formData) {
    liked = fetcher.formData!.get("like") === "true";

    console.log(fetcher.formData?.get("terms")=="on");
  }
  
  return (
    <div className="p-10">
      <img src={loaded.image} alt="" className="h-96" />
      <h1 className="text-4xl font-bold">{loaded.title}</h1>
      <p>{loaded.body}</p>
      {/* /post/:postId/like */}
      <fetcher.Form method="post" action="like">
        <input type="checkbox" name="terms" />
        <button name="like" value={liked ? "true" : "false"}>
          {liked ? (
            <FontAwesomeIcon icon={faHeartSolid} color="red" />
          ) : (
            <FontAwesomeIcon icon={faHeartHollow} color="red" />
          )}
        </button>
      </fetcher.Form>
    </div>
  );
};

export default Object.assign(Post, { loader, likeAction });
