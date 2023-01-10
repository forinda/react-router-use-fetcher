import { ApiInterface, IPostInterface } from "./interfaces/Api";

class AppApi implements ApiInterface {
  private _posts: IPostInterface[];
  private _apiName = "route-hooks-api-0000000";

  constructor() {
    this._posts = JSON.parse(localStorage.getItem(this.apiName)!)
      ? JSON.parse(localStorage.getItem(this.apiName)!)
      : [];
  }

  get posts() {
    return this._posts;
  }

  get apiName() {
    return this._apiName;
  }

  set posts(posts: IPostInterface[]) {
    this._posts = posts;
  }
  getPostById = async (id: string) => {
    const pSlice = this.posts.slice();
    return pSlice.find((p) => p.id === id);
  };
  createPost = async (post: IPostInterface) => {
    const id = new Date().getTime().toString();
    if (!post.body) {
      throw new Error("Post body required");
    }
    if (!post.title) {
      throw new Error("Post title required");
    }

    const newPost = {
      ...post,
      id,
      createdAt: new Date(),
      updatedAt: new Date(),
      image: `https://picsum.photos/id/${
        this.posts.length + 10 + Math.floor(Math.random() * 100)
      }/1000/1000`,
    } satisfies IPostInterface;
    this.posts = [...this.posts, newPost];
    this.sync();
    return newPost;
  };
  updatePostById = async (id: string, data: Partial<IPostInterface>) => {
    const updatedPosts = this.posts
      .slice()
      .map((p) => (p.id === id ? { ...p, ...data } : p));
    this.posts = [...updatedPosts];
    const updated = updatedPosts.find((p) => p.id === id);
    this.sync();
    return updated;
  };
  likePostById = async (id: string) => {
    const updatedPosts = this.posts
      .slice()
      .map((p) => (p.id === id ? { ...p, like: !p.like } : p));
    this.posts = [...updatedPosts];
    const updated = updatedPosts.find((p) => p.id === id);
    this.sync();
    return updated;
  };
  deletePostById = async (id: string) => {
    const posts = this.posts.filter((p) => p.id !== id);
    const found = this.posts.findIndex((p) => p.id === id);
    if (found === -1) {
      return false;
    }
    this.posts = [...posts];
    this.sync();
    return true;
  };
  getPosts = async (page?: number | undefined, count?: number | undefined) => {
    return this.posts;
  };
  searchPosts = async (q: string) => {
    const searchRegex = new RegExp(q, "g");
    const posts = this.posts.filter((p) => searchRegex.test(p.title));
    if (posts.length === 0) {
      return null;
    }
    if (posts.length === 1) {
      return posts[0];
    }
    return posts;
  };

  sync() {
    localStorage.setItem(this.apiName, JSON.stringify(this.posts));
  }
}

export default new AppApi();
