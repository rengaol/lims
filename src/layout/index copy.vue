<template>
  <div class="admin-container">
    <el-container>
      <el-aside :class="isCollapse == true ? 'block' : 'el-aside'">
        <p>
          <img src="../assets/logo.png" alt="" />
          <span>lims系统</span>
        </p>
        <Menu :isCollapse="isCollapse" :menuData="menuData" />
      </el-aside>
      <el-container>
        <el-header class="header">
          <Header :isCollapse="isCollapse" />
          <TabBar class="tab" />
        </el-header>
        <el-main>
            <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
// import menus from "../mock/menu.json";
import Menu from "./components/Menu/index.vue";
import Header from "./components/Header/index.vue";
import { get_menu } from "../api";
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";
import TabBar from "./components/TabBar/index.vue";
const store = useStore();
//导航菜单展示折叠
const isCollapse = computed(() => {
  return store.getters.collapse;
});
//menu数据
const menuData = ref([]);
const getMenu = () => {
  get_menu().then((res) => {
    console.log(res);
    menuData.value = res.data.menu;
    // menuData.value = menus.menu;
    // console.log(menuData.value, document.body.clientHeight, "高");
  });
};
onMounted(() => {
  getMenu();
});
</script>

<style lang="scss" scoped>
.admin-container {
  background-color: #f1f2f5;
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  top: 0;
  left: 0;
}
.header {
  height: 60px;
  line-height: 60px;
  background-color: #fff;
}
.el-menu {
  height: calc(100vh - 70px) !important;
  border-right-color: #293246;
  overflow: hidden;
}
.el-aside {
  width: 200px;
  background-color: #293246;
  border: none;
  p {
    overflow: hidden;
    color: #fff;
    text-align: center;
    height: 50px;
    line-height: 50px;
    margin: 10px;
    img {
      width: 48px;
    }
  }
}
.block {
  width: 60px;
  overflow: hidden;
  border: none;
}
.el-main {
  margin: 0px 16px;
  margin-top: 64px;
  background-color: #fff;
}
</style>
<style>
.el-header {
  padding: 0 !important;
}
</style>
