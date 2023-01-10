export interface IPostInterface {
  id?: string;
  title: string;
  body: string;
  createdAt?: Date;
  updatedAt?: Date;
  image?: string;
  like?: boolean;
}

export interface ApiInterface {
  /**
   * Get single post by id
   * */
  getPostById: (id: string) => Promise<IPostInterface | undefined>;
  /**
   *  Create post entry
   * @package
   * @param {IPostInterface} post
   *  */
  createPost: (
    post: IPostInterface
  ) => Promise<IPostInterface | IPostInterface[] | null>;
  /**
   * Edit a given post that matches an id
   * @param {string} id
   * @param {IPostInterface} data
   * */
  updatePostById: (
    id: string,
    data: Partial<IPostInterface>
  ) => Promise<IPostInterface | undefined>;/**
   * Edit a given post that matches an id
   * @param {string} id
   * @param {IPostInterface} data
   * */
  likePostById: (
    id: string,
      ) => Promise<IPostInterface | undefined>;
  /**
   * Delete a post matching a given id
   * @param {string} id
   * */
  deletePostById: (id: string) => Promise<boolean>;
  /**
   *
   * Get a list of posts
   *@param {number} page
   *@param {number} count
   * */
  getPosts: (
    page?: number,
    count?: number
  ) => Promise<IPostInterface[] | null | undefined>;
  /**
   * Search a given post
   *@param {string} q
   **/
  searchPosts: (q: string) => Promise<IPostInterface | IPostInterface[] | null>;
}
