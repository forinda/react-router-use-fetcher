import { ActionFunctionArgs } from "react-router-dom";

export const createPostAction = async ({ request }: ActionFunctionArgs) => {
  const formdata = await request.formData();
  
  return  formdata
};
