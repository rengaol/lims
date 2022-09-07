<template>
  <div class="content">
    <div class="header">
      <div class="left">
        <div class="el-icon">
          <el-icon v-if="isCollapse" @click="handelColl(isCollapse)"
            ><Fold
          /></el-icon>
          <el-icon v-else @click="handelColl(isCollapse)"><Expand /></el-icon>
        </div>
        <Breadcrumb class="hidden-xs-only" />
      </div>
      <div class="right">
        <el-badge :value="10" :max="99" class="item">
          <el-button class="btn">
            <el-icon size="large" color="#000"> <Bell /> </el-icon>
          </el-button>
        </el-badge>
        欢迎登录，{{ username }}
        <div class="date">{{ dates.toLocaleString() + " " + weeks[date] }}</div>
      </div>
    </div>
    <Tabar />
  </div>
</template>

<script setup>
import Tabar from "../TabBar/index.vue";
import { defineProps, onBeforeMount, ref, onUnmounted } from "vue";
import { useStore } from "vuex";
import Breadcrumb from "../Breadcrumb/index.vue";
const store = useStore();
const props = defineProps(["isCollapse"]);
const username = ref(localStorage.getItem("name"));
console.log(localStorage.getItem("name"));
const dates = ref(new Date());
const date = ref(new Date().getDay());
const weeks = ref([
  "星期日",
  "星期一",
  "星期二",
  "星期三",
  "星期四",
  "星期五",
  "星期六",
]);
const timer = ref(null);
console.log(dates.value.toLocaleString() + "" + weeks.value[date.value]);
const handelColl = (flag) => {
  console.log(flag);
  store.dispatch("changeCollapse");
};
onBeforeMount(() => {
  timer.value = setInterval(() => getDate(), 1000);
});
const getDate = () => {
  const now = new Date();
  dates.value = now;
  date.value = now.getDay();
};
onUnmounted(() => {
  if (timer.value != null) {
    clearInterval(timer.value);
  }
});
</script>

<style lang="scss" scoped>
.header {
  width: 100%;
  line-height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 10px;
  background-color: #fff;
}
.left {
  display: flex;
  justify-items: center;
  line-height: 60px;
  margin: 10px;
  .hidden-xs-only {
    flex: 1;
    margin-left: 20px;
  }
}
.right {
  margin-right: 20px;
  font-size: 14px;
  display: flex;
  justify-items: center;
  .date {
    margin-left: 10px;
  }
}

.item {
  font-size: 0px;
  margin-right: 20px;
}
</style>
<style>
.el-badge .el-badge__content {
  top: 20px !important;
  border: none;
  margin-right: 10px;
}
.btn {
  border: none;
}
.btn:hover {
  background-color: #fff;
}
</style>
