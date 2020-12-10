import axios from "axios";

const state = {
  post: {},
  posts: [],
};

const getters = {
  currentPost: (state) => state.post,
  allPosts: (state) => state.posts,
};

const actions = {
  getPost({ commit }, data) {
    commit("viewPost", data);
  },
  async getAllPosts({ commit }, data) {
    let res = await axios.get("http://localhost:5000/api/posts");
    commit("setPosts", res.data);
    return res;
  },
  async submitPost({ commit }, data) {
    try {
      commit("post_request");
      let res = await axios.post(
        "http://localhost:5000/api/posts/submit",
        data
      );
      if (res.data.success !== undefined) {
        commit("post_success");
      }
      return res;
    } catch (err) {
      commit("post_error", err);
    }
  },
  async updatePost({ commit }, data) {
    let res = await axios.put(
      `http://localhost:5000/api/posts/${data.id}`,
      data
    );
    // commit("viewPost", data);
    return res;
  },
};

const mutations = {
  viewPost(state, post) {
    state.post = post;
  },
  setPosts(state, posts) {
    posts.reverse();
    state.posts = posts;
  },
  post_request(state) {
    state.status = "loading";
    state.error = null;
  },
  post_success(state) {
    state.status = "success";
    state.error = null;
  },
  post_error(state, err) {
    state.error = err.response.data.msg;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
