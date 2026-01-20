// 1.Dependency
import { createStore } from "vuex";
import getters from "./getters";

const modules = {};
const moduleFiles = import.meta.glob("./modules/*.js", { eager: true });

Object.keys(moduleFiles).forEach((path) => {
    const moduleName = path.replace(/^\.\/modules\/(.*)\.\w+$/, "$1");
    modules[moduleName] = moduleFiles[path].default;
});

// 2.Store
const store = {
    modules,
    getters,
};

export default createStore(store);
