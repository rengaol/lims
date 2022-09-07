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
      <el-container :class="isCollapse == true ? 'headerd' : 'header'">
        <el-header >
          <Header :isCollapse="isCollapse" />
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
  // getMenu();
});
</script>

<style lang="scss" scoped>
.admin-container {
  background-color: #f1f2f5;
  width: 100%;
  // height: 100%;
  // height: 930px;
  overflow: hidden;
  position: relative;
  top: 0;
  left: 0;
  display: flex;
  justify-content: flex-end;
}
// .header {
//   width: calc(100% - 200px);
//   height: 60px;
//   line-height: 60px;
//   background-color: #fff;
//   position: fixed;
//   top: 0;
//   z-index: 999;
//   // margin-left: 200px;
//   // .el-container:nth-child(2) {
//   //   flex: 1;
//   //   margin-left: 200px;
//   // }
// }
.headerd {
  width: calc(100% - 64px);
  height: 60px;
  line-height: 60px;
  background-color: #fff;
  position: fixed;
  top: 0;
  z-index: 999;
.el-container:nth-child(2) {
  flex: 1;
  margin-left: 60px;}
}

.el-container:nth-child(1) {
  flex: 1;
  .el-aside {
    position: fixed;
    top: 0;
    left: 0;
    flex: 1;
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
  .el-menu {
    height: calc(100vh - 70px) !important;
    border-right-color: #293246;
    overflow: hidden;
  }
  .block {
  width: 60px;
  overflow: hidden;
  border: none;
}
}
.el-container:nth-child(2) {
  flex: 1;
  margin-left: 200px;
  .el-main {
  margin: 0px 16px;
  margin-top: 126px;
  background-color: #fff;
}
}



</style>
<style lang="scss">
// .headerd {
//   width: calc(100% - 64px);
//   height: 60px;
//   line-height: 60px;
//   background-color: #fff;
//   position: fixed;
//   top: 0;
//   z-index: 999;
//   // .el-container:nth-child(2) {
//   //   flex: 1;
//   //   margin-left: 60px;
//   // }
// }
// .header {
//   width: calc(100% - 200px);
//   height: 60px;
//   line-height: 60px;
//   background-color: #fff;
//   position: fixed;
//   top: 0;
//   z-index: 999;
//   .el-container:nth-child(2) {
//     flex: 1;
//     margin-left: 200px;
//   }
//   .el-container {
//   flex: 1;
// }
// .el-container:nth-child(2) {
//   flex: 1;
//   margin-left: 200px;
// }
// .el-aside {
//   position: fixed;
//   top: 0;
//   left: 0;
//   flex: 1;
//   width: 200px;
//   background-color: #293246;
//   border: none;
//   p {
//     overflow: hidden;
//     color: #fff;
//     text-align: center;
//     height: 50px;
//     line-height: 50px;
//     margin: 10px;
//     img {
//       width: 48px;
//     }
//   }
// }
// }
</style>
