<template>
    <div class="">
        <a href="weixin://dl/business/?appid=wxc20757e33fe09d22">点击这里</a>
        <QuickTable title="1212" :data="data" :columns="columns">
            <template #headerRight>
                <h4>headerRight</h4>
            </template>
            <template #name12="{ row }"> <a href="weixin://dl/business/?appid=wx1234567890">点击这里</a></template>
        </QuickTable>
    </div>
</template>

<script lang="ts" setup>
import { h, ref } from 'vue'
import { QuickTable } from 'meetjs-design';
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
            header: () => {
                return h('a', { style: { color: 'red' } }, 'custom content')
            },
            default: ({ row }) => {
                // console.log(row);
                return h('a', { style: { color: 'blue' } }, row.email)
            }
        }
    },
])

setTimeout(() => {
    data.value.push({ name1: 'name1', name11: 'name1.1', name12: 'name1.2', name2: 'name2', age: 18, email: 'example.com' })
}, 1000)
</script>
<style lang="scss" scoped></style>