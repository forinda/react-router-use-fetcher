import React from "react";
import {
  ActionFunctionArgs,
  Form,
  useActionData,
  useSubmit,
} from "react-router-dom";
import api from "../api/api";

const searchAction = async ({ request, params }: ActionFunctionArgs) => {
  const formdata = Object.fromEntries(await request.formData());
  await api.searchPosts(formdata.q as string);
  return formdata;
};

const Search = () => {
  const searchInput = React.useRef<HTMLInputElement>(null);
  const submit = useSubmit();
  const results = useActionData();
  return (
    <div>
      <Form
        method="get"
        action="/search"
        role={'search'}
        className="w-full flex border relative"
      >
        <input
          type="text"
          name="q"
          ref={searchInput}
          onChange={(e) => submit(e.currentTarget.form)}
          className="w-full border-none ring-0 focus:ring-0"
        />
        <button type="submit">Search</button>
        <div></div>
      </Form>
    </div>
  );
};

export default Object.assign(Search, { searchAction });
