import axios from "axios";

const state = {
  comments: [],
};

const getters = {
  allComments: (state) => state.comments,
};

const actions = {
  async getAllComments({ commit }, data) {
    let res = await axios.get(`/api/comments?id=${data}`);
    commit("setComments", res.data);
    return res;
  },

  async createComment({ commit }, data) {
    try {
      commit("comment_request");
      let res = await axios.post("/api/comments/create", data);
      if (res.data.success !== undefined) {
        commit("comment_success");
      }
      return res;
    } catch (err) {
      commit("comment_error", err);
    }
  },
};

const mutations = {
  setComments(state, comments) {
    state.comments = comments;
  },
  comment_request(state) {
    state.status = "loading";
    state.error = null;
  },
  comment_success(state) {
    state.status = "success";
    state.error = null;
  },
  comment_error(state, err) {
    state.error = err.response.data.msg;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
