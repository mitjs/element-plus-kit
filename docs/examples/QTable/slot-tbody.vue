<template>
    <div class="">
        <QTable :title="title" :data="tableData" :columns="columns" :page="page">
            <template #headerRight>
                <el-button type="primary" size="small">添加</el-button>
            </template>
            <template #sex.header="{ row }">
                <el-tag size="small" type="warning">Sex</el-tag>
            </template>
            <template #sex="{ row }">
                <el-tag size="small" v-if="row.sex === 1">男</el-tag>
                <el-tag size="small" type="danger" v-if="row.sex === 2">女</el-tag>
            </template>
            <!-- <template #action>
                <el-button type="primary" size="small" text>查看</el-button>
                <el-button type="primary" size="small" text>编辑</el-button>
                <el-button type="danger" size="small" text>删除</el-button>
            </template> -->
        </QTable>
    </div>
</template>

<script lang="ts" setup>
import { ref, h } from 'vue'
import { QTable, type TableColums } from '@meetjs/element-plus-kit'
import { ElTag, ElButton } from 'element-plus'

const title = ref('用户信息表')

const page = ref({ currentPage: 1, sizePage: 10, total: 30 })

const tableData = ref([
    { name: '张三', age: 18, sex: 1, hobby: '打游戏，看电影' },
    { name: '李四', age: 35, sex: 2, hobby: '打游戏，看电影' },
    { name: '王五', age: 25, sex: 1, hobby: '打游戏，看电影' },
    { name: '赵六', age: 16, sex: 2, hobby: '打游戏，看电影' },
    { name: '钱七', age: 23, sex: 1, hobby: '打游戏，看电影' },
])

const columns = ref<TableColums[]>([
    {
        type: 'selection',
        align: 'center',
    },
    {
        label: '序号',
        type: 'index',
        align: 'center',
        width: 60
    },
    {
        prop: 'name',
        label: ({ column, $index }) => {
            return h(ElTag, {}, { default: () => '姓名' })
        }
    },
    {
        prop: 'age',
        label: ({ column, $index }) => {
            return h(ElTag, {}, { default: () => '年龄' })
        },
        align: 'center',
        render: ({ row, column, $index }) => {
            return h('a', { style: { color: row.age > 20 ? 'green' : 'blue' } }, { default: () => row.age })
        },

    },
    {
        prop: 'sex',
        label: '性别',
    },
    {
        prop: 'hobby',
        label: '爱好',
        width: 200
    },
    {
        prop: 'action',
        fixed: 'right',
        label: '操作',
        width: 150,
        render: ({ row, column, $index }) => {
            return h('div', {}, [
                h(ElButton, { type: 'primary', size: 'small', text: true }, { default: () => '查看' }),
                h(ElButton, { type: 'danger', size: 'small', text: true }, { default: () => '删除' }),
            ])
        }
    },
])



</script>