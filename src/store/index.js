import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state() {
    return {
      tasksList: []
    }
  },
  getters: {
    getTasks(state) {
      return state.tasksList;
    },
    getTask(_, getters) {
      return id => getters.getTasks.find(el => el.id === id);
    },
    getActiveCount(_, getters) {
      return getters.getTasks.filter(el => el.status === "active").length;
    }
  },
  mutations: {
    addTask(state, payload) {
      state.tasksList.push(payload);
    },
    setTasks(state, payload) {
      state.tasksList = payload;
    },
    changeTask(state, task){
      const i = state.tasksList.findIndex(item => item.id === task.id);
      state.tasksList[i] = task;
    }
  },
  actions: {
    async saveTask({ commit }, payload) {
      await axios.put("https://vue-freelance-lsn-default-rtdb.firebaseio.com/tasks/"+payload.id+".json", JSON.stringify(payload) );
      commit("addTask", payload);
    },

    async tasks({ commit }) {
      const { data } = await axios.get("https://vue-freelance-lsn-default-rtdb.firebaseio.com/tasks.json");
      if(data) {
        const tasks = Object.keys(data).map((key) => {
          return {
            ...data[key]
          }
        });
        commit("setTasks", tasks);
      }
      // console.log('store', store);
    },

    async updateTask( {commit}, payload) {
      console.log(payload.id)
      await axios.put(`https://vue-freelance-lsn-default-rtdb.firebaseio.com/tasks/${payload.id}.json`, JSON.stringify(payload) );
      commit("changeTask", payload);
    }
  },
});
