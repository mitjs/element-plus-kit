<template>
    <div class="">
        <QTable ref="qtableRef" :title="title" stripe :data="data" :columns="columns" :page="page"
            @page-change="pageChange" @select="onSelect" @sort-change="onSortChange" @sizeChange="sizeChange"
            @currentChange="currentChange">

            <template #headerRight>
                <h4>headerRight</h4>
            </template>
            <!-- <template #name12="{ row }"> <a href="weixin://dl/business/?appid=wx1234567890">点击这里</a></template> -->
            <template #append>222</template>
            <template #empty>1111</template>
            <template #action>
                <el-button type="primary">添加</el-button>
            </template>
        </QTable>
    </div>
</template>

<script lang="ts" setup>
import { h, ref, watch } from 'vue'
import { QTable, type TableColums } from '@meetjs/element-plus-kit';
import type { QPaginationProps } from '@elementplus-kit/components';
const title = ref('sdfdsdsdf')
const data = ref<any>([
    { name2: '张三', age: 30, name12: '213123', email: 'zhangsan@example.com' },
    { name2: '李四', age: 30, email: 'zhangsan@example.com' },
])
const columns = ref<TableColums[]>([
    { type: 'index', width: 50 }, { type: 'selection', width: 50 },
    {
        label: 'Name',
        children: [
            {
                prop: 'name1',
                label: 'Name1',
                children: [
                    {
                        prop: 'name11',
                        label: 'Name1.1',
                    },
                    {
                        prop: 'name12',
                        label: 'Name1.2',
                    }
                ]
            },
            {
                prop: 'name2',
                label: 'Name2',
            }
        ]
    },
    {
        prop: 'age',
        label: 'Age',
        sortable: true,
    },
    {
        prop: 'email',
        label: ({ column, $index }) => {
            return h('a', { style: { color: 'red' } }, 'custom content')
        },
        render: ({ row, column, $index }) => {
            // console.log(row);
            return h('a', { style: { color: 'blue' } }, row.email)
        }
    },
])

const page = ref<QPaginationProps>({ currentPage: 1, pageSize: 10, total: 500, })


setTimeout(() => {
    data.value.push({ name11: 'name1.1', name12: 'name1.2', name2: 'name2', age: 18, email: 'example.com' })
    title.value = 'New Title'
    console.log('%C', ' 333 ', qtableRef.value);
    page.value.total = 100
}, 1000)

watch(
    page,
    (newVal) => {
        // console.log(newVal);

        // emit("update:page", newVal);
    },
    { deep: true }
);
const onSelect = (value) => {
    console.log(value);

}
const onSortChange = ({ column, prop, order }) => {
    console.log(column, prop, order);
}
const pageChange = (page, type) => {
    console.log(page, type);
}
const sizeChange = (vals) => {
    console.log('currentChange', vals);
}
const currentChange = (vals) => {
    console.log('currentChange', vals);
}
const qtableRef = ref(null)
</script>
<style lang="scss" scoped></style>