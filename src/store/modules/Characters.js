import axios from "axios";

const state = {
  character: {},
  characters: [],
};

const getters = {
  currentCharacter: (state) => state.character,
  allCharacters: (state) => state.characters,
};

const actions = {
  getCharacter({ commit }, data) {
    //re-write to accept only id instead of full a object
    commit("viewCharacter", data);
  },
  async getAllCharacters({ commit }, data) {
    let res = await axios.get("/api/characters");
    commit("setCharacters", res.data);
    return res;
  },
};

const mutations = {
  viewCharacter(state, character) {
    state.character = character;
  },
  setCharacters(state, characters) {
    state.characters = characters;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
