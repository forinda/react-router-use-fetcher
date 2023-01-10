import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import Search from "../components/Search";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartHollow } from "@fortawesome/free-regular-svg-icons";
import useAppSate from "../hooks/useAppState";

const Home = () => {
  const { posts } = useAppSate();
  return (
    <div className="p-10 sticky top-0">
      <div className="flex justify-between max-w-7xl mx-auto border-b">
        <h1>Posts</h1> {/* <Search/> */}
        {posts.length > 0 && (
          <Link
            to={"/post/create/new"}
            className="px-4 py-1 bg-blue-500 text-white rounded"
          >
            Create more
          </Link>
        )}
      </div>

      {posts.length ? (
        <ul className="flex flex-col justify-center items-center gap-2">
          {posts.map((p, idx) => (
            <Link
              to={`/post/${p.id}`}
              key={p.id}
              className="border max-w-4xl min-w-[30rem] p-2"
            >
              <div className="flex gap-10">
                <img
                  src={p.image || "https://picsum.photos/200"}
                  alt=""
                  className="w-40 h-40 object-cover rounded-full"
                />
                <div className="flex justify-center flex-col">
                  <h1 className="text-2xl font-bold">{p.title}</h1>
                  <p>{p.body.slice(0, 200)}</p>
                  <div className="border-t p-2 my-2">
                    {p.like ? (
                      <FontAwesomeIcon icon={faHeartSolid} color="red" />
                    ) : (
                      <FontAwesomeIcon icon={faHeartHollow} color="red" />
                    )} {p.like&&'Liked'}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </ul>
      ) : (
        <div>
          <h1>No posts </h1>
          <Link
            to={"/post/create/new"}
            className="px-4 py-1 bg-blue-500 text-white rounded"
          >
            Create one
          </Link>
        </div>
      )}
    </div>
  );
};

export default Home;
