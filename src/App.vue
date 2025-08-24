<template>
    <!-- <router-view /> -->

    <!-- Svg图标演示 -->
    SVG内联演示：
    <Icon name="iruxu" :size="24" />

    <!-- 当前环境 -->
    <ul>
        <li>当前页面：Index</li>
        <li>当前环境：{{ ENV_NAME }}</li>
    </ul>
</template>

<script>
export default {
    name: "App",
    components: {},
    props: [],
    data: function () {
        return {
            ENV_NAME: import.meta.env.VITE_ENV_NAME,
        };
    },
    watch: {},
};
</script>

<style lang="less">
@import "@/assets/css/app.less";
</style>
