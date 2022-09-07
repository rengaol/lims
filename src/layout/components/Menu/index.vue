<!-- menu菜单栏 2022/7/27 rgl -->
<template>
  <!-- <p>
    <img src="../assets/logo.png" alt="" />
    <span>lims系统</span>
  </p> -->
  <el-menu
    :default-active="activeIndex"
    :collapse="isCollapse"
    @open="handleOpen"
    @close="handleClose"
    router
    background-color="#293246"
    text-color="#fff"
    active-text-color="#fff"
  >
    <template v-for="item in menuData">
      <MenuItem :data="{ item }" />
    </template>
  </el-menu>
</template>

<script setup>
import MenuItem from "./MenuItem.vue";
import { defineProps, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { Menu as IconMenu } from "@element-plus/icons-vue";
const route = useRoute();
const router = useRouter();
const props = defineProps(["isCollapse", "menuData"]);
const activeIndex = ref("");
console.log(
  activeIndex.value,
  props.menuData,
  "menu",
  router.currentRoute.value
);
const handleOpen = (key, keyPath) => {
  console.log(key, keyPath, "handleOpen");
};
const handleClose = (key, keyPath) => {
  console.log(key, keyPath, "handl看了看");
};
watch(
  () => route.path,
  () => {
    console.log(route.path, router.path);
    activeIndex.value = route.path;
    // editableTabsValue.value = route.path;
    // if (editableTabs.every((v) => v.path !== route.path)) {
    //   editableTabs.push({
    //     path: route.path,
    //     name: route.meta.title,
    //   });
    // }
  },
  { immediate: true }
);
</script>

<style>
.el-menu:not(.el-menu--collapse) {
  width: 200px;
}
</style>
