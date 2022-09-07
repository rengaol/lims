<template>
  <div class="container">
    <div class="table">
      <div class="t-head">
        <div
          class="t-head-item"
          v-for="(item, index) in columns"
          :key="index"
          :style="{ width: item.width + 'px' }"
        >
          {{ item.title }}
          <div class="sort-logo" v-if="item.sort" @click="changeSort(item)">
            <a-icon v-if="item.sort == 'up'" type="up" />
            <a-icon v-else type="down" />
          </div>
        </div>
      </div>
      <div class="t-body" @scroll="scrollDatas">
        <div
          class="t-body-item"
          v-for="(cur, ind) in data"
          :key="ind"
        
          :style="{
            top: ind * 42 + 'px',
            height: (data.length - ind) * 42 + 'px',
          }"
        >
          <div
            class="t-head-item"
            v-for="(item, index) in columns"
            :key="index"
            :style="{ width: item.width + 'px' }"
          >
            <span
              v-if="item.scopedSlots && item.scopedSlots.customRender == 'tags'"
            >
              <span
                v-for="(item, i) in cur[item.key]"
                :key="i"
                class="t-head-item-tags"
                >{{ item }}</span
              >
            </span>
            <span v-else>{{ cur[item.key] }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// const columns = [
//   {
//     dataIndex: "name",
//     key: "name",
//     title: "Name",
//     width: 200,
//   },
//   {
//     title: "Age",
//     dataIndex: "age",
//     key: "age",
//     width: 120,
//     sort: true,
//   },
//   {
//     title: "Address",
//     dataIndex: "address",
//     key: "address",
//     width: 300,
//   },
//   {
//     title: "Tags",
//     key: "tags",
//     dataIndex: "tags",
//     scopedSlots: { customRender: "tags" },
//     width: 200,
//   },
//   {
//     title: "Action",
//     key: "action",
//     scopedSlots: { customRender: "action" },
//     width: 120,
//   },
// ];

// let data = [
//   {
//     key: "1",
//     name: "John Brown",
//     age: 32,
//     address: "New York No. 1 Lake Park",
//     tags: ["nice", "developer"],
//   },
//   {
//     key: "2",
//     name: "Jim Green",
//     age: 42,
//     address: "London No. 1 Lake Park",
//     tags: ["loser"],
//   },
//   {
//     key: "3",
//     name: "Joe Black",
//     age: 32,
//     address: "Sidney No. 1 Lake Park",
//     tags: ["cool", "teacher"],
//   },
// ];

// function getDatas() {
//   for (let i = 0; i < 1000; i++) {
//     data.push({
//       key: i + 3 + "",
//       name: `Joe Black${i}`,
//       age: Math.floor(Math.random() * i),
//       address: `Sidney No. ${i + 3} Lake Park`,
//       tags: ["cool", "teacher"],
//     });
//   }
// }
// getDatas();
// console.log(data);
export default {
  data() {
    return {
      data: [
        {
          key: "1",
          name: "John Brown",
          age: 32,
          address: "New York No. 1 Lake Park",
          tags: ["nice", "developer"],
        },
        {
          key: "2",
          name: "Jim Green",
          age: 42,
          address: "London No. 1 Lake Park",
          tags: ["loser"],
        },
        {
          key: "3",
          name: "Joe Black",
          age: 32,
          address: "Sidney No. 1 Lake Park",
          tags: ["cool", "teacher"],
        },
      ],
      columns: [
        {
          dataIndex: "name",
          key: "name",
          title: "Name",
          width: 200,
        },
        {
          title: "Age",
          dataIndex: "age",
          key: "age",
          width: 120,
          sort: true,
        },
        {
          title: "Address",
          dataIndex: "address",
          key: "address",
          width: 300,
        },
        {
          title: "Tags",
          key: "tags",
          dataIndex: "tags",
          scopedSlots: { customRender: "tags" },
          width: 200,
        },
        {
          title: "Action",
          key: "action",
          scopedSlots: { customRender: "action" },
          width: 120,
        },
      ],
      scrollTop: 0,
      // offsetHeight: 420,
    };
  },
  mounted() {
    this.getDatas();
  },
  methods: {
    getDatas() {
      for (let i = 0; i < 1000; i++) {
        this.data.push({
          key: i + 3 + "",
          name: `Joe Black${i}`,
          age: Math.floor(Math.random() * i),
          address: `Sidney No. ${i + 3} Lake Park`,
          tags: ["cool", "teacher"],
        });
      }
      console.log(this.data)
    },
    // 正倒排序
    changeSort(item) {
      if (item.sort === "up") {
        item.sort = "dowm";
        this.data = this.data.sort((a, b) => a.age - b.age);
      } else {
        item.sort = "up";
        this.data = this.data.sort((a, b) => b.age - a.age);
      }
    },
    // 滚动列表
    scrollDatas(el) {
      let target = el.target;
      // 卷曲的高度
      this.scrollTop = target.scrollTop;
      // 当前显示的高度
      // this.offsetHeight = target.offsetHeight;
    },
  },
};
</script>
<style lang="scss">
.table {
  border: 1px solid #000;
  .t-head {
    display: flex;
    border-bottom: 1px solid #000;
    .t-head-item {
      padding: 10px 20px;
      font-weight: 1000;
      text-align: center;
      border-right: 1px solid #000;
      border-left: none;
      .sort-logo {
        display: inline-block;
        cursor: pointer;
      }
    }
  }
  .t-body {
    position: relative;
    height: 420px;
    overflow: auto;
    .t-body-item {
      position: absolute;
      display: flex;
      &:hover > .t-head-item {
        background-color: aquamarine;
      }
      .t-head-item {
        height: 42px;
        margin-top: -1px;
        padding: 10px 20px;
        font-weight: 600;
        text-align: center;
        border-top: 1px solid #000;
        border-right: 1px solid #000;
        border-left: none;
        .t-head-item-tags {
          margin: 0 3px;
          padding: 1px 5px;
          border: 2px solid skyblue;
          border-radius: 5px;
          background-color: rgb(178, 219, 235);
        }
      }
    }
  }
}
</style>
