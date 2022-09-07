<template>
  <template v-for="item in data">
    <el-sub-menu
      :index="item._id"
      v-if="item.children && item.children.length > 0"
    >
      <template #title>
        <el-icon>
          <component :is="item.icon" />
        </el-icon>
        <span>{{ item.label }}</span>
      </template>
      <MenuItem :data="item.children"></MenuItem>
    </el-sub-menu>
    <el-menu-item v-else :index="'/' + item.key" :key="'/' + item.key">
      <el-icon>
        <component :is="item.icon" />
      </el-icon>
      <span>{{ item.label }}</span>
    </el-menu-item>
  </template>
</template>

<script setup>
import { Menu as IconMenu } from "@element-plus/icons-vue";
import { defineProps } from "vue";
const props = defineProps(["data"]);
</script>

<style lang="scss">
// .el-sub-menu {
//   // max-height: 100vh;
// }
.el-menu-item.is-active {
  background-color: #7e9cff;
}
</style>
