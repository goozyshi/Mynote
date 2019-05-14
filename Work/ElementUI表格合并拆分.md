## element-UI 表格合并拆分
## [Table组件官网](https://element.eleme.cn/#/zh-CN/component/table)
### 1. 单条数据合并

通过给table传入span-method方法可以实现合并行或列，方法的参数是一个对象，里面包含当前行row、当前列column、当前行号rowIndex、当前列号columnIndex四个属性。该函数可以返回一个包含两个元素的数组，第一个元素代表rowspan，第二个元素代表colspan。 也可以返回一个键名为rowspan和colspan的对象。

JS
```js
var Main = {
    data() {
      return {
        tableData: [{
          id: '12987122',
          name: '王小虎',
          amount1: '234',
          amount2: '3.2',
          amount3: 10
        }, {
          id: '12987123',
          name: '王小虎',
          amount1: '165',
          amount2: '4.43',
          amount3: 12
        }, {
          id: '12987124',
          name: '王小虎',
          amount1: '324',
          amount2: '1.9',
          amount3: 9
        }]
      };
    },
    methods: {
      objectSpanMethod({ row, column, rowIndex, columnIndex }) {
        if (columnIndex === 0) {
          if (rowIndex % 2 === 0) {
            return {
              rowspan: 2,
              colspan: 1
            };
          } else {
            return {
              rowspan: 0,
              colspan: 0
            };
          }
        }
      }
    }
  };
var Ctor = Vue.extend(Main)
new Ctor().$mount('#app')
```
CSS
```css
@import url("//unpkg.com/element-ui@2.8.2/lib/theme-chalk/index.css");
```
HTML
```html
<script src="//unpkg.com/vue/dist/vue.js"></script>
<script src="//unpkg.com/element-ui@2.8.2/lib/index.js"></script>
<div id="app">
<template>
  <div>
    <el-table
      :data="tableData"
      :span-method="objectSpanMethod"
      border
      style="width: 100%; margin-top: 20px">
      <el-table-column
        prop="id"
        label="ID"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名">
      </el-table-column>
      <el-table-column
        prop="amount1"
        label="数值 1（元）">
      </el-table-column>
      <el-table-column
        prop="amount2"
        label="数值 2（元）">
      </el-table-column>
      <el-table-column
        prop="amount3"
        label="数值 3（元）">
      </el-table-column>
    </el-table>
  </div>
</template>
</div>
```
### 单条数据拆分
[原文](https://stackoverflow.com/questions/53550407/how-to-split-the-cell-to-match-my-table-data-use-element-ui-and-vue)

通过 `slot` 设置多级表头并隐藏表头 `:show-header="false"`

JS
```js
var Main = {
    data() {
      return {
        form: [{
        id: 1,
        name: "one_hi_comed",
        time: "2018-11-27 00:00:00",
        info: [{
            type: "32",
            id: 33,
            msg: "hello",
            img_url: "http://sdfsdfsf.png"
        }, {
            type: "32",
            id: 33,
            msg: "hello",
            img_url: "http://sdfsdfsf.png"
        }, {
            type: "32",
            id: 33,
            msg: "hello",
            img_url: "http://sdfsdfsf.png"
        }]
      }, {
          id: 1,
          name: "online_hi_comed",
          time: "2018-11-27 00:00:00",
          info: [{
              type: "32",
              id: 33,
              msg: "hello",
              img_url: "http://sdfsdfsf.png"
          }, {
              type: "32",
              id: 33,
              msg: "hello",
              img_url: "http://sdfsdfsf.png"
          }, {
              type: "32",
              id: 33,
              msg: "hello",
              img_url: "http://sdfsdfsf.png"
          }]

      }]
      }
    },
    methods:{
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      const arr = [4, 5, 6, 7] // 需要隐藏宽度的列的index
      if(columnIndex === 3) {
        return {
          rowspan: 1,
          colspan: 3
        }
      } else  if(arr.includes(columnIndex)){
        return {
          rowspan: 0,
          colspan: 0
        }
      }
    }
  }
}
var Ctor = Vue.extend(Main)
new Ctor().$mount('#app')
```
CSS
```css
@import url("//unpkg.com/element-ui@2.4.11/lib/theme-chalk/index.css");

.el-table{
      td.sub_row {
        padding: 0;
        border-bottom: none;
        border-right: none;
        &>.cell {
          padding: 0;
        }
      }
    }
```
HTML
```html
<script src="//unpkg.com/vue/dist/vue.js"></script>
<script src="//unpkg.com/element-ui@2.4.11/lib/index.js"></script>
<div id="app">
<template>
  <el-table
        :data="form"
        :span-method="objectSpanMethod"
        border>
        <el-table-column
          prop="id"
          label="id">
        </el-table-column>
        <el-table-column
          prop="name"
          label="name">
        </el-table-column>
        <el-table-column
          prop="time"
          label="time">
        </el-table-column>
        <el-table-column
          prop="type"
          class-name="sub_row"
          label="type">
          <template slot-scope="scope">
            <el-table :data="scope.row.info" :show-header="false">
              <el-table-column
                prop="type">
              </el-table-column>
              <el-table-column
                prop="msg">
              </el-table-column>
              <el-table-column
                prop="img_url">
                <template slot-scope="scope">
                  <img :src="scope.row.img_url">
                </template>
              </el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column
          prop="msg"
          label="msg">
        </el-table-column>
        <el-table-column
          prop="img_url"
          label="img">
        </el-table-column>
      </el-table>
</template>
</div>
```