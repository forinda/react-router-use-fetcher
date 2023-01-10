import React from "react";
import { ActionFunctionArgs, Form, redirect } from "react-router-dom";
import api from "../api/api";
import { IPostInterface } from "../api/interfaces/Api";

const newPostAction = async ({ request }: ActionFunctionArgs) => {
  const formdata = await request.formData();
  try {
    const data = Object.fromEntries(formdata);
    await api.createPost(data as unknown as IPostInterface);
    return redirect('/ ');
  } catch (error) {
    return error;
  }
};

const NewPost = () => {
  return (
    <div>
      <Form method="post" className="max-w-[40rem] p-20 border m-4 shadow mx-auto">
        <h1 className="text-4xl font-bold py-2">Create new Post</h1>
        <div className="flex flex-col">
          <label htmlFor="title">Title</label>

          <input
            type="text"
            name="title"
            placeholder=""
            className="border p-1"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="body">Body</label>
          <textarea
            name="body"
            className="border p-2"
            id=""
            cols={30}
            rows={10}
            placeholder="body..."
          ></textarea>
        </div>
        <button className="border py-2 w-full my-4 bg-blue-500 text-white rounded">
          Submit
        </button>
      </Form>
    </div>
  );
};

export default Object.assign(NewPost, { newPostAction });
