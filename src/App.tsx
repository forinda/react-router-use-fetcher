import { useState } from "react";
import useAppSate from "./hooks/useAppState";
import { useFetcher } from "react-router-dom";

function App() {
  const { posts, createPost } = useAppSate();
  const fetcher = useFetcher();

  return (
    <div>
      <ul>
        {posts.map((p) => (
          <h1>{p.title}</h1>
        ))}
      </ul>
      <fetcher.Form method="post" action="/create">
        <input type="text" name="title" />
        <input type="text" name="body" />
        <button>Submit</button>
      </fetcher.Form>
      <button
        onClick={(e) => {
          createPost({ body: "Sample body", title: "Title" });
        }}
      >
        Create post
      </button>
    </div>
  );
}

export default App;
