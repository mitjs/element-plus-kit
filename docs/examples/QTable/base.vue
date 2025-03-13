<template>
    <div class="">
        <QTable :title="title" :data="tableData" :columns="columns" :page="page">
            <template #headerRight>
                <el-button type="primary">导出</el-button>
            </template>
            <template #action>
                <el-button type="primary" size="small" text>查看</el-button>
                <el-button type="primary" size="small" text>编辑</el-button>
                <el-button type="danger" size="small" text>删除</el-button>
            </template>

        </QTable>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { QTable, type TableColums, } from '@meetjs/element-plus-kit'

const title = ref('用户信息表')

const page = ref({ currentPage: 2, pageSize: 10, total: 30 })

const tableData = ref([
    { name: '张三', age: 18, sex: '男' },
    { name: '李四', age: 20, sex: '女' },
    { name: '王五', age: 25, sex: '男' },
    { name: '赵六', age: 23, sex: '女' },
    { name: '钱七', age: 21, sex: '男' },
])
const columns = ref<TableColums[]>([
    { type: 'selection', align: 'center', },
    { label: '序号', type: 'index', align: 'center', width: 60 },
    { prop: 'name', label: '姓名' },
    { prop: 'age', label: '年龄' },
    { prop: 'sex', label: '性别' },
    { prop: 'action', fixed: 'right', label: '操作', width: 200, },
])



</script>