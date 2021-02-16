import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    installInfo: {},
    loginInfo: {},
    wizardInfo: {},
  },

  mutations: {
    updateInstallInfo(state, details) {
      Object.assign(state.installInfo, details);
    },
    updateLoginInfo(state, details) {
      Object.assign(state.loginInfo, details);
    },
    updateWizardInfo(state, details) {
      Object.assign(state.wizardInfo, details);
    },
  },

  actions: {},

  modules: {},
});
