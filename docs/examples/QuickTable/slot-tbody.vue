<template>
    <div class="">
        <p>无数据时</p>
        <QuickTable :title="title" :data="tableData" :columns="columns" v-model:page="page">
            <template #headerRight>
                <el-button type="primary">导出</el-button>
            </template>
            <template #append>
                <div style="font-size:24px;color:#337edf;margin: 15px;">append插槽</div>
            </template>
            <template #empty>
                <div style="font-weight:400;font-size:32px;margin: 30px;font-family: kaiti;">空空如也</div>
            </template>
        </QuickTable>

        <hr>
        <p>有数据时</p>
        <QuickTable :title="title" :data="tableData1" :columns="columns" v-model:page="page">
            <template #sex="{ row }">
                {{ row }}
                <!-- <el-tag size="small" v-if="row.sex === 1">男</el-tag>
                <el-tag size="small" v-if="row.sex === 2">女</el-tag> -->
            </template>
            <template #action>
                <el-button type="primary" size="small" text>查看</el-button>
                <el-button type="primary" size="small" text>编辑</el-button>
                <el-button type="danger" size="small" text>删除</el-button>
            </template>
        </QuickTable>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { QuickTable } from '@meetjs/element-plus-kit'

const title = ref('用户信息表')

const page = ref({ current: 1, size: 10, total: 30 })

const pageConfig = ref({
    // layout: ' prev, pager, next, sizes,total',
})



const tableData = ref([])
const tableData1 = ref([
    { name: '张三', age: 18, sex: 1 },
    { name: '李四', age: 20, sex: 2 },
    { name: '王五', age: 25, sex: 1 },
])

const columns = ref([
    { type: 'selection', align: 'center', },
    { label: '序号', type: 'index', align: 'center', width: 60 },
    { prop: 'name', label: '姓名' },
    { prop: 'age', label: '年龄' },
    { prop: 'sex', label: '性别' },
    { prop: 'action', fixed: 'right', label: '操作', width: 200, },
])



</script>