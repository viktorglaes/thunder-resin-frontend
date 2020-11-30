import axios from "axios";

const state = {
  guide: {},
  guides: [],
};

const getters = {
  currentGuide: (state) => state.guide,
  allGuides: (state) => state.guides,
};

const actions = {
  getGuide({ commit }, data) {
    commit("viewGuide", data);
  },
  async getAllGuides({ commit }, data) {
    let res = await axios.get("http://localhost:5000/api/guides");
    commit("setGuides", res.data);
    return res;
  },
  async submitGuide({ commit }, data) {
    try {
      commit("guide_request");
      let res = await axios.post(
        "http://localhost:5000/api/guides/submit",
        data
      );
      if (res.data.success !== undefined) {
        commit("guide_success");
      }
      return res;
    } catch (err) {
      commit("guide_error", err);
    }
  },
};

const mutations = {
  viewGuide(state, guide) {
    state.guide = guide;
  },
  setGuides(state, guides) {
    state.guides = guides;
  },
  guide_request(state) {
    state.status = "loading";
    state.error = null;
  },
  guide_success(state) {
    state.status = "success";
    state.error = null;
  },
  guide_error(state, err) {
    state.error = err.response.data.msg;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
