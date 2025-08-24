<template>
    <svg class="rx-icon" :width="size" :height="size" aria-hidden="true" focusable="false" role="img">
        <!-- 同时写 href 与 xlink:href，兼容性更好 -->
        <use :href="symbolId" :xlink:href="symbolId" />
    </svg>
</template>

<script>
export default {
    name: "Icon",
    props: {
        name: { type: String, required: true }, // 如 "home"
        prefix: { type: String, default: "icon-" }, // 与插件的 symbolId 前缀一致
        size: { type: [Number, String], default: 24 }, // 图标大小，单位 px
    },
    computed: {
        symbolId() {
            return `#${this.prefix}${this.name}`;
        },
    },
};
</script>
