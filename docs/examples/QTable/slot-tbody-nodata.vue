<template>
    <div class="">
        <QTable :title="title" :data="tableData" :columns="columns" :page="page">
            <template #headerRight>
                <el-button type="primary">导出</el-button>
            </template>
            <template #append>
                <div style="font-size:24px;color:#337edf;margin: 15px;">append插槽</div>
            </template>
            <template #empty>
                <div style="font-weight:400;font-size:32px;margin: 30px;font-family: kaiti;">空空如也</div>
            </template>
        </QTable>
    </div>
</template>

<script lang="ts" setup>
import { ref, h } from 'vue'
import { QTable, type TableColums, } from '@meetjs/element-plus-kit'

const title = ref('用户信息表')

const page = ref({ currentPage: 1, pageSize: 10, total: 30 })

const tableData = ref([])

const columns = ref<TableColums[]>([
    { type: 'selection', align: 'center', },
    { label: '序号', type: 'index', align: 'center', width: 60 },
    { prop: 'name', label: '姓名' },
    {
        prop: 'age',
        label: '年龄',
    },
    {
        prop: 'sex', label: '性别',
    },
])

</script>