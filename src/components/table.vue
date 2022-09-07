<template>
  <div class="elBtn">
    <el-button type="primary" @click="AddHandle"> 添加 </el-button>
    <el-button type="primary" @click="AddHandle"> 上传 </el-button>
    <el-button type="primary" @click="AddHandle"> 下载 </el-button>
  </div>
  <el-table
    :data="tableData"
    border
    style="width: 100%"
    @sort-change="sortHandlerChange"
    @filter-change="onChange"
    @selection-change="handleSelectionChange"
  >
    <el-table-column type="selection" width="55" />
    <el-table-column
      v-for="(item, index) in columns"
      :prop="item.title"
      :label="item.title"
      :sortable="item.title == 'name'"
      :filters="item.filters"
      :filtered-value="filterData[index]"
      :filter-method="item.title == 'name' ? filterHandler : ''"
    >
      <template #default="scope" v-if="item.title == 'tags'">
        <el-tag
          v-for="i in scope.row[item.title]"
          :type="i.length > 5 ? '' : 'success'"
          >{{ i.toUpperCase() }}
        </el-tag>
      </template>
      <template #default="scope" v-else></template>
      <template #default="scope" v-if="item.title == 'operation'">
        <el-button type="primary" text @click="EditHandle(scope.row)">
          <el-icon><EditPen /></el-icon> 编辑
        </el-button>
        <el-popconfirm
          title="确定删除当前信息吗?"
          @confirm="confirmEvent(scope.row)"
          confirm-button-text="确定"
          cancel-button-text="取消"
          @cancel="cancelEvent"
        >
          <template #reference>
            <el-button type="danger" text>
              <el-icon><Delete /></el-icon>删除</el-button
            >
          </template>
        </el-popconfirm>
      </template>
    </el-table-column>
  </el-table>
  <div class="pagenation">
    <el-pagination
      :small="small"
      :disabled="disabled"
      :background="background"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      :current-page="page"
      :page-size="size"
      :page-sizes="sizes"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    ></el-pagination>
  </div>
  <el-dialog v-model="dialogFormVisible" title="添加样本信息">
    <el-form :model="form">
      <el-form-item label="name" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="tags" :label-width="formLabelWidth">
        <el-select
          v-model="form.tags"
          multiple
          placeholder="Please select tags"
        >
          <el-option label="demo" value="demo" />
          <el-option label="ts" value="ts" />
          <el-option label="js" value="js" />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="ConfirmHandle(form)"
          >Confirm</el-button
        >
      </span>
    </template>
  </el-dialog>
  <el-dialog v-model="editVisible" title="编辑样本信息">
    <el-form :model="form">
      <el-form-item label="name" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="tags" :label-width="formLabelWidth">
        <el-select
          v-model="form.tags"
          multiple
          placeholder="Please select tags"
        >
          <el-option label="demo" value="demo" />
          <el-option label="ts" value="ts" />
          <el-option label="js" value="js" />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="editVisible = false">Cancel</el-button>
        <el-button type="primary" @click="ConfirmEdit(form)">Confirm</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
// import ElDialog from "./eldialog.vue";
import { ref, defineProps, reactive, defineEmits } from "vue";
import { get_sample } from "../api/index";
const props = defineProps(["columns", "tableData", "total", "page"]);
const emit = defineEmits();
console.log(props.columns);
const dialogFormVisible = ref(false);
const editVisible = ref(false);
const formLabelWidth = "140px";
//当前页数
const page = ref(1);
//每页显示多少条
const size = ref(10);
//每页显示多少的选项
const sizes = ref([10, 20, 30, 40, 50, 100]);
const form = reactive({
  name: "",
  tags: "",
  // site: "",
  // __v: 0,
  // _id: "",
});
const sort = ref({});
const filterData = ref({});
const filterName = ref("");
const obj = ref({});
//每页显示条数
let handleSizeChange = (val) => {
  console.log(val);
  size.value = val;
  page.value = 1;
  emit("tablePages", size.value, "", page.value, "", sort.value);
};
//当前第几页
let handleCurrentChange = (val) => {
  page.value = val;
  console.log(val, page.value);
  //                页数   总条数  当前页  筛选    排序
  // const HanleData = (limit, total, offset, filter,sort) => {
  emit("tablePages", size.value, "", page.value, "", sort.value);
};
//添加按钮
const AddHandle = () => {
  dialogFormVisible.value = true;
  console.log(dialogFormVisible.value);
};
//编辑按钮
const EditHandle = (row) => {
  console.log(row);
  editVisible.value = true;
  form.name = row.name;
  form.tags = row.tags;
  form.site = row.site;
  form.__v = row.__v;
  form._id = row._id;
  form.key = row._id;
};
//编辑确认
const ConfirmEdit = (row) => {
  console.log(row);
  get_sample(row, "put").then((res) => {
    console.log(res);
    emit("tablePages", size.value, "", page.value, "", sort.value);
  });
  editVisible.value = false;
};
//添加确认
const ConfirmHandle = (form) => {
  if (form.name != "" && form.tags != "") {
    console.log(form);
    get_sample(form, "post").then((res) => {
      console.log(res);
      emit("tablePages");
    });
    dialogFormVisible.value = false;
  } else {
    dialogFormVisible.value = false;
  }
  form.name = "";
  form.tag = "";
};
//删除
const confirmEvent = (row) => {
  console.log(row.id);

  get_sample({ sampleId: row._id }, "delete").then((res) => {
    console.log(res);
    emit("tablePages", size.value, "", page.value, "", sort.value);
  });
  //  emit("tablePages")
};
//排序
const sortHandlerChange = ({ column, prop, order }) => {
  const property = column["property"];
  let sorts = "";
  if (order == "ascending") {
    sorts = 1;
  } else {
    sorts = -1;
  }
  sort.value = { [property]: sorts };
  emit("tablePages", size.value, "", page.value, "", sort.value);
};
//筛选
const onChange = (filters) => {
  let data = [];
  for (var k in filters) {
    if (filters[k] != "") {
      filterData.value[k] = filters[k];
      obj.value = {
        name: filterData.value[k],
      };
      data.push(obj.value);
    }
  }
  emit("tablePages", size.value, "", page.value, ...data, sort.value);
};
const filterHandler = (value, row, column) => {
  const property = column["property"];
  column["id"] = property;
  console.log(value, row, column, filterData.value);
  //   for (let i in filterData.value){
  //  console.log(filterData.value[i],)
  //  obj.value = {
  //     [property]: filterData.value[i],
  //   };
  //   }
  // obj.value = {
  //   [column['id']]:column['filteredValue'],
  // };
  // filterName.value=property
  // console.log(value)
  // return row[property] === value;
};
const handleSelectionChange=(val)=>{
console.log(val)
val.map((i)=>{
  console.log(i._id)
})
}
</script>
<style lang="scss">
.elBtn {
  margin-bottom: 20px;
}
.el-tag {
  margin-left: 10px;
}
.pagenation {
  float: right;
  margin: 10px 0;
}
</style>
