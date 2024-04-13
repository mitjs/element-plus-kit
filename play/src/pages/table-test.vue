<template>
    <div class="">
        <QuickTable ref="qtableRef" :title="title" stripe :data="data" :columns="columns" v-model:page="page" :total="total"
            :page-config="pageConfig" @page-change="pageChange" @select="onSelect" @sort-change="onSortChange">
            <template #headerRight>
                <h4>headerRight</h4>
            </template>
            <!-- <template #name12="{ row }"> <a href="weixin://dl/business/?appid=wx1234567890">点击这里</a></template> -->
            <template #append>222</template>
            <template #empty>1111</template>
        </QuickTable>
    </div>
</template>

<script lang="ts" setup>
import { h, ref, watch } from 'vue'
import { QuickTable } from 'meetjs-design';
const title = ref('sdfdsdsdf')
const data = ref([{ name2: '张三', age: 30, name12: '213123', email: 'zhangsan@example.com' },
{ name2: '李四', age: 30, email: 'zhangsan@example.com' },])
const columns = ref([
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
        label: 'Email',
        slot: {
            header: ({ column, $index }) => {
                return h('a', { style: { color: 'red' } }, 'custom content')
            },
            default: ({ row, column, $index }) => {
                // console.log(row);
                return h('a', { style: { color: 'blue' } }, row.email)
            }
        }
    },
])

const page = ref({ current: 1, size: 10, })
const total = ref(500)
const pageConfig = ref({
    layout: 'total, prev, pager, next, sizes,',
    'prev-text': '上一页',
})

setTimeout(() => {
    data.value.push({ name1: 'name1', name11: 'name1.1', name12: 'name1.2', name2: 'name2', age: 18, email: 'example.com' })
    title.value = 'New Title'
    console.log('%C', ' 333 ', qtableRef.value);

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
const pageChange = ({ current, size }, type) => {
    console.log(current, size, type);

}
const qtableRef = ref(null)
</script>
<style lang="scss" scoped></style>