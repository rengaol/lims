<!-- tabs标签页 2022/7/27 rgl-->
<template>
  <div id="tabs-bar-container" class="tabs-bar-container">
    <el-tabs
      v-model="editableTabsValue"
      type="card"
      :closable="editableTabs.length > 1"
      class="tabs-content"
      @tab-click="handleTabsClick"
      @tab-remove="handleTabRemove"
    >
      <el-tab-pane
        class="tabs"
        v-for="item in editableTabs"
        :key="item.path"
        :label="item.name"
        :name="item.path"
      >
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script setup>
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
const route = useRoute();
const store = useStore();
const router = useRouter();
const editableTabsValue = ref("");
const editableTabs = store.getters["menuItems"];
const handleTabsClick = (tab) => {
  router.push({
    path: tab.props.name,
  });
};
const handleTabRemove = (tab) => {
  store.dispatch("removeMenuItem", tab).then((res) => {
    console.log(tab, "fllflf地方");
    for (let i = 0; i < editableTabs.length; i++) {
      console.log(editableTabs[i]);
      if (tab === editableTabs[i].path && editableTabs.length >= 1) {
        try {
          editableTabs.splice(i, 1);
          console.log(
            editableTabs[i - 1],
            editableTabs[i - 1],
            editableTabs[i].path   
          );
          router.push({
            path: editableTabs[i - 1]
              ? editableTabs[i - 1].path
              : editableTabs[i].path,
          });
        } catch (error) {
          console.log(error);
        }
      }
    }
  });
};
watch(
  () => route.path,
  () => {
    editableTabsValue.value = route.path;
    if (editableTabs.every((v) => v.path !== route.path)) {
      editableTabs.push({
        path: route.path,
        name: route.meta.title,
      });
    }
  },
  { immediate: true }
);
</script>
<style lang="scss" scoped>
.tabs-bar-container {
  box-sizing: border-box;
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: space-between;
  height: 55px;
  padding-right: 20px;
  padding-left: 20px;
  user-select: none;
  background: white;
  &.horizontal {
    padding: 0 40px;
  }
  :deep(.fold-unfold) {
    margin-right: 20px;
  }
  :deep(.el-tabs__item) {
    display: inline-flex;
    align-items: center;
  }
  .item {
    display: inline-flex;
    align-items: center;
    .menu-icon {
      display: flex;
      padding-right: 5px;
    }
  }

  .tabs-content {
    width: calc(100% - 90px);
    :deep(.el-tabs__nav-next, .el-tabs__nav-prev) {
      height: 34px;
      line-height: 34px;
    }
    :deep(.el-tabs__header) {
      border-bottom: 0;
      .el-tabs__nav {
        border: 0;
        .el-tabs__item {
          box-sizing: border-box;
          height: 34px;
          margin-right: 5px;
          line-height: 34px;
          border: none;
          border-radius: 2px;
          transition: padding 0.5s cubic-bezier(0.645, 0.045, 0.355, 1) !important;
          &.is-active {
            border: none;
            border-bottom: 2px solid;
          }
          &:hover {
            border: none;
            border-bottom: 2px solid;
          }
        }
      }
    }
  }
}
</style>
