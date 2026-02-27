import ChatDb from "../../utils/idb";

const state = {
    loading: false, // ask loading,
    isStreamLoad: false, // stream loading
    isRecording: false, // 正在录制
    isPlaying: false, // 正在播放
    inputValue: "", // 要发送的内容
    pageLoading: false, // 整个chatLoading
    isDeepChecked: false, // 是否深度思考

    db: "",
};
const mutations = {
    SET_STATE_KEY(state, { key, val }) {
        state[key] = val;
    },
};
const actions = {
    setKey({ commit }, data) {
        commit("SET_STATE_KEY", data);
    },
    initDb({ commit }) {
        const chatDb = new ChatDb();
        commit("SET_STATE_KEY", { key: "db", val: chatDb });
    },
    setDbItem({ state }, { key, value }) {
        return new Promise((resolve, reject) => {
            state.db.ready().then(() => {
                state.db
                    .setItem(key, value)
                    .then(() => {
                        resolve(true);
                    })
                    .catch((err) => {
                        reject(err);
                    });
            });
        });
    },
    getDbItem({ state }, key) {
        return new Promise((resolve, reject) => {
            state.db.ready().then(() => {
                state.db
                    .getItem(key)
                    .then((res) => {
                        resolve(res);
                    })
                    .catch((err) => {
                        reject(err);
                    });
            });
        });
    },
    removeDbItem({ state }, key) {
        return new Promise((resolve, reject) => {
            state.db.ready().then(() => {
                state.db
                    .removeItem(key)
                    .then((res) => {
                        resolve(res);
                    })
                    .catch((err) => {
                        reject(err);
                    });
            });
        });
    },
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
};
