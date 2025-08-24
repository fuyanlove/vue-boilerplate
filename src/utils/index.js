import RxTime from "@iruxu/rx-common/utils/rx-time";
const timeInstance = new RxTime();

export function formatDate(value, mode = "date") {
    if (value) {
        if (mode === "date") {
            return timeInstance.format(value, "YYYY-MM-DD");
        }
        if (mode === "time") {
            return timeInstance.format(value, "HH:mm:ss");
        }
        if (mode === "hour") {
            return timeInstance.format(value, "HH:mm");
        }
        if (mode === "datetime") {
            return timeInstance.format(value, "YYYY-MM-DD HH:mm:ss");
        }
    }
}

// 时间转换
export function formatTime(time, format = "YYYY-MM-DD HH:mm:ss") {
    const _time = new Date(time);
    return timeInstance.format(_time, format);
}

/**
 * 去除对象空值
 * @param {*} obj
 * @returns
 */
export function removeEmpty(obj) {
    const newObj = {};
    for (const key in obj) {
        if (obj[key] !== null && obj[key] !== undefined && obj[key] !== "") {
            newObj[key] = obj[key];
        }
    }
    return newObj;
}

// params 不确定的对象
export function removeEmptyParams(params) {
    const newParams = {};
    for (const key in params) {
        if (params[key] !== undefined && params[key] !== "") {
            newParams[key] = params[key];
        }
    }
    return newParams;
}

// 数组转tree
export function array2Tree(array, params = { parentKey: "parent_id", parentValue: 0, childrenKey: "children" }) {
    const tree = [];
    // 在数组中查找具有指定父ID的所有子项
    for (let i = 0; i < array.length; i++) {
        if (~~array[i][params.parentKey] === ~~params.parentValue) {
            // 递归调用，将子项转换为子树
            const children = array2Tree(array, { ...params, parentValue: array[i].id });

            if (children.length) {
                array[i][params.childrenKey] = children;
            }

            tree.push(array[i]);
        }
    }

    return tree;
}

// 多字段排序
export function sortBy(filed1, filed2) {
    return function (a, b) {
        if (a[filed1] === b[filed1]) {
            return a[filed2].localeCompare(b[filed2]);
        }
        return a[filed1].localeCompare(b[filed1]);
    };
}

// 导出csv
export function exportCsv(list, titles = []) {
    if (!titles.length) return list;
    const keys = titles.map((item) => item.key);
    const labels = titles.map((item) => item.label);
    const mapList = [];
    list.forEach((item) => {
        const newItem = [];
        keys.forEach((key) => {
            newItem.push(item[key]);
        });
        mapList.push(newItem.join(","));
    });
    mapList.unshift(labels.join(","));
    return mapList.join("\r\n");
}

// 导出xlsx
export function exportXlsx(list, titles = []) {
    if (!titles.length) return list;
    const keys = titles.map((item) => item.key);
    const labels = titles.map((item) => item.label);
    const mapList = [];
    list.forEach((item) => {
        const newItem = [];
        keys.forEach((key) => {
            newItem.push(item[key]);
        });
        mapList.push(newItem);
    });
    mapList.unshift(labels);
    return mapList;
}

// 是否只保留remainKey
export function arr2map({ array = [], key = "key", remainKey = "" } = {}) {
    if (
        !array?.length ||
        !array.every((item) => key in item) ||
        (remainKey && !array.every((item) => remainKey in item))
    ) {
        console.log("【参数错误】", array, key, remainKey);
        return {};
    }
    return array.reduce((acc, cur) => {
        return { ...acc, [cur[key]]: remainKey ? cur[remainKey] : cur };
    }, {});
}

export function map2arr(map) {
    return Object.entries(map).map(([key, value]) => {
        return {
            name: value,
            key: key,
        };
    });
}

export function dispatchEventStorage() {
    const _setItem = localStorage.setItem;

    localStorage.setItem = function (key, val) {
        // 注册一个名称为 setItemEvent 的事件
        let setEvent = new Event("setItemEvent");
        // key 为改变的 key， newVal 为改变的 value
        setEvent.key = key;
        setEvent.newVal = val;

        window.dispatchEvent(setEvent);

        _setItem.apply(this, arguments);
    };
}

export function formatNumber(num, fixed = 0, prefix = "") {
    if (!num || isNaN(num)) return `${prefix}0`;

    // 将数字转换为字符串，保留两位小数
    const formattedNumber = num.toFixed(fixed).replace(/\B(?=(\d{3})+(?!\d))/g, ","); // 每三位添加一个逗号

    return `${prefix}${formattedNumber}`;
}
