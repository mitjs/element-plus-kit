# QuickTable

快捷表格（quick-table）融合了Element-Plus 的 Table 表格 ，Pagination 分页 组件开发，；分为**表头**、**表格**，**分页** 三个区域；


## 基础用法

:::demo
QuickTable/base
:::


## 插槽使用

插槽分为三类：分别时表头、表格和分页插槽；
### **表头插槽**
:::demo
QuickTable/slot-theader
:::

### **表格插槽**

表格内容区域插槽，支持原始组件的 的`empty`和`append` 插槽；

:::demo
QuickTable/slot-tbody-nodata
:::

除了原始组件拥有的的`empty`和`append`外，还支持了**操作列插槽**、**数据列插槽**、**表头插槽**。

1. **操作列插槽**：`action`，配置了`action`插槽，则出现操作列，如果需要配置操作列的其他属性，可在`columns`中添加`prop:'action`的对象，对象中可自由定义操作列；
2. **数据列插槽，表头插槽**：用来配置自定义渲染内容的，主要是支持两种方式配置；
   - 方式1：slot 下的 `header`、`default` 函数
```ts
{
    prop: 'age',
    label: '年龄',
    slot: {
        header: ({ column, $index }) => {
            return h('a', { style: { color: 'red' } }, '年龄(20为分界)')
        },
        default: ({ row, column, $index }) => {
            return h('a', { style: { color: row.age > 20 ? 'red' : 'blue' } }, row.age)
        }
    }
},

```
 - 方式2：组件内部使用 **`#列标识.header`** 配置表头 ，**`#列标识`** 配置单元格内容
```vue
<template>
 <QuickTable :title="title" :data="tableData1" :columns="columns1" v-model:page="page">
   <!-- 配置 sex.header 插槽实现表头自定义渲染内容 -->
    <template #sex.header="{ row }">
        <el-tag size="small" type="warning">Sex</el-tag>
    </template>
   <!-- 配置 sex 插槽实现单元格内容自定义渲染 -->
    <template #sex="{ row }">
        <el-tag size="small" v-if="row.sex === 1">男</el-tag>
        <el-tag size="small" type="danger" v-if="row.sex === 2">女</el-tag>
    </template>
</QuickTable>
</template>

```
如下案例
:::demo
QuickTable/slot-tbody
:::

### **分页插槽**
:::demo
QuickTable/slot-tfooter
:::



## 树形数据
支持树类型的数据的显示。 当 row 中包含 `children` 字段时，被视为树形数据。 渲染嵌套数据需要 prop 的 `row-key`
:::demo
QuickTable/tree-table
:::



## QuickTable API

### QuickTable  属性
以下是 QuickTable 新属性，Element-Plus 的 [Table 表格](https://element-plus-docs.bklab.cn/zh-CN/component/table.html) 原始配置均支持
| **属性名**  | **说明**                             | **类型**                                             | **默认值** |
| ----------- | ------------------------------------ | ---------------------------------------------------- | ---------- |
| title       | 表格标题，居左                       | `string`                                             | -          |
| columns     | 表格列对象                           | ^[object]`ColumnProps[]`                             | []         |
| data        | 数据                                 | ^[object]`any[]`                                     | []         |
| page        | 分页对象，配置此属性，则开启尾部分页 | ^[object]`{current:number,size:number,total:number}` | -          |
| page-config | 分页组件其他选项配置                 | `object`                                             | -          |

### QuickTable 事件

以下为 QuickTable 新增事件，Element-Plus 的 [Table 表格](https://element-plus-docs.bklab.cn/zh-CN/component/table.html) 默认事件均支持

| **事件名**  | **说明**                                      | **类型**                                                        |
| ----------- | --------------------------------------------- | --------------------------------------------------------------- |
| page-change | 分页变化时触发,返回`page`对象和触发变化的类型 | ^[Function]`(page:object,type:'currentPage'\|'pageSize')=>void` |



### QuickTable 插槽

| 插槽名          | 说明                                                                                                                                    |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| theader         | 表格头部区域插槽，如果配置，则 属性`title`,插槽`headerLeft`和`headerRight`均失效                                                        |
| headerLeft      | 头部左侧区域插槽                                                                                                                        |
| headerRight     | 头部右侧区域插槽                                                                                                                        |
| action          | 表格操作列自定义的内容，配置后则出现操作列，如需配置操作列属性，可在columns单配置`prop`为`action`的对象                                 |
| tfooter         | 表格尾部区域插槽，这里默认指分页位置                                                                                                    |
| append          | 插入至表格最后一行之后的内容， 如果需要对表格的内容进行无限滚动操作，可能需要用到这个 slot。 若表格有合计行，该 slot 会位于合计行之上。 |
| empty           | 当数据为空时自定义的内容                                                                                                                |
| `[prop]`        | `prop` 列单元格自定义的内容                                                                                                             |
| `[prop]`.header | `prop` 列表头区域自定义的内容                                                                                                           |

###  QuickTable 方法

Element-Plus 的 [Table 表格](https://element-plus-docs.bklab.cn/zh-CN/component/table.html) 相关方法均支持
