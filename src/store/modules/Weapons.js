import axios from "axios";

const state = {
  weapon: {},
  weapons: [],
};

const getters = {
  currentWeapon: (state) => state.weapon,
  allWeapons: (state) => state.weapons,
};

const actions = {
  getWeapon({ commit }, data) {
    commit("viewWeapon", data);
  },
  async getAllWeapons({ commit }, data) {
    let res = await axios.get("http://localhost:5000/api/weapons");
    commit("setWeapons", res.data);
    return res;
  },
};

const mutations = {
  viewWeapon(state, weapon) {
    state.weapon = weapon;
  },
  setWeapons(state, weapons) {
    state.weapons = weapons;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
