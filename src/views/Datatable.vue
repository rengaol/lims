<template>
  <div>
    <!-- <div class="elBtn">
    <el-button type="primary" @click="AddHandle"> 添加 </el-button>
  </div> -->
  <el-scrollbar>
    <Table  @tablePages="HanleData"   :tableData="tableData" :columns="columns" :total="param.total"  :page="param.limit"/>
</el-scrollbar>
</div>
</template>

<script setup>
import Table from "../components/table.vue";
import { onMounted, reactive, ref } from "vue";
import { get_sample } from "../api/index";
// import tableDatas from "../mock/sample.json";
const tableData = ref([]);
const param = reactive({
  //表格数据的请求参数
  limit: 10,
  total: 0,
  offset: 0,
  filter: {},
  sort: {},
});
const columns = reactive([
  {
    dataIndex: "name",
    key: "name",
    title: "name",
    width: 200,
    filters: [
      { text: "sample", value: "sample" },
      { text: "test", value: "test" },
    ],
    button: false,
  },
  {
    dataIndex: "tags",
    key: "tags",
    title: "tags",
    width: 200,
    button: false,
  },
  {
    dataIndex: "operation",
    key: "operation",
    title: "operation",
    width: 200,
    button: false,
  },
]);
onMounted(() => {
  HanleData();
});
//获取table表格数据
// const HanleData = (page, size, sort, filter,total) => {
  //                页数   总条数  当前页  筛选    排序
const HanleData = (limit, total, offset, filter,sort) => {
  console.log({ ...filter },total,sort);
  let sortName = {};
  for (let i in sort) {
    sortName = { [sort[0]]: sort[1] };
  }
  let params = {
    limit: limit || param.limit,
    total:total||0,
    offset: offset - 1 ? offset - 1 : 0,
    filter: filter ? filter : {},
    sort: sort ? sort : param.sort,
  };
  get_sample(params, "get").then((res) => {
    tableData.value = res.data.sampleTable;
    // tableData.value = tableDatas.sampleTable
    // console.log(tableData.value, tableDatas.sampleTable);
    param.limit = res.data.sampleParam.limit;
    param.total = res.data.sampleParam.total;
    param.offset = res.data.sampleParam.offset + 1;
    param.sort = res.data.sampleParam.sort;
  });
};
</script>

<style lang="scss" scoped></style>
