# QuickTable

快捷表格（quick-table）融合了Element-Plus 的 Table 表格 ，Pagination 分页 组件开发，；分为**表头**、**表格**，**分页** 三个区域；


## 基础用法

:::demo
QuickTable/base
:::


## 插槽使用

插槽分为三类：分别时表头、表格和分页插槽；
-  **表头插槽**
:::demo
QuickTable/slot-theader
:::

- **表格插槽**
:::demo
QuickTable/slot-tbody
:::

- **分页插槽**
:::demo
QuickTable/slot-tfooter
:::


## QuickTable API

### QuickTable  属性

| **属性名**  | **说明**                             | **类型**                                             | **默认值** |
| ----------- | ------------------------------------ | ---------------------------------------------------- | ---------- |
| title       | 表格标题，居左                       | `string`                                             | -          |
| columns     | 表格列对象                           | ^[object]`ColumnProps[]`                             | []         |
| data        | 数据                                 | ^[object]`any[]`                                     | []         |
| page        | 分页对象，配置此属性，则开启尾部分页 | ^[object]`{current:number,size:number,total:number}` | -          |
| page-config | 分页组件其他选项配置                 | `object`                                             | -          |



### QuickTable 插槽

| 插槽名      | 说明                                                                                                                                    |     |     |
| ----------- | --------------------------------------------------------------------------------------------------------------------------------------- | --- | --- |
| theader     | 表格头部区域插槽，如果配置，则 属性`title`,插槽`headerLeft`和`headerRight`均失效                                                        |     |     |
| headerLeft  | 头部左侧区域插槽                                                                                                                        |     |     |
| headerRight | 头部右侧区域插槽                                                                                                                        |     |     |
| action      | 表格操作列插槽                                                                                                                          |     |     |
| tfooter     | 表格尾部区域插槽，这里默认指分页位置                                                                                                    |     |     |
| append      | 插入至表格最后一行之后的内容， 如果需要对表格的内容进行无限滚动操作，可能需要用到这个 slot。 若表格有合计行，该 slot 会位于合计行之上。 |     |     |
| empty       | 当数据为空时自定义的内容                                                                                                                |     |     |
|             |                                                                                                                                         |     |     |

