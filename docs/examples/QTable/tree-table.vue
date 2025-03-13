<template>
    <div>
        <QTable :data="tableData" :columns="columns" row-key="id" border default-expand-all>
        </QTable>
        <hr>
        <QTable :data="tableData" :columns="columns" row-key="id" border lazy :load="load"
            :tree-props="{ children: 'children', hasChildren: 'hasChildren' }">
        </QTable>

    </div>
</template>
<script lang="ts" setup>
import { ref, h } from 'vue'
import { QTable, type TableColums } from '@meetjs/element-plus-kit'
interface User {
    id: number
    date: string
    name: string
    address: string
    hasChildren?: boolean
    children?: User[]
}
const columns = ref<TableColums[]>(
    [
        { prop: 'date', label: 'Date', sortable: true },
        { prop: 'name', label: 'Name', sortable: true },
        { prop: 'address', label: 'Address', sortable: true },
    ]
)

const load = (
    row: User,
    treeNode: unknown,
    resolve: (data: User[]) => void
) => {
    setTimeout(() => {
        resolve([
            {
                id: 31,
                date: '2016-05-01',
                name: 'wangxiaohu',
                address: 'No. 189, Grove St',
            },
            {
                id: 32,
                date: '2016-05-01',
                name: 'wangxiaohu',
                address: 'No. 189, Grove St',
            },
        ])
    }, 1000)
}

const tableData: User[] = [
    {
        id: 1,
        date: '2016-05-02',
        name: 'wangxiaohu',
        address: 'No. 189, Grove St',
    },
    {
        id: 2,
        date: '2016-05-04',
        name: 'wangxiaohu',
        address: 'No. 189, Grove St',
    },
    {
        id: 3,
        date: '2016-05-01',
        name: 'wangxiaohu',
        address: 'No. 189, Grove St',
        children: [
            {
                id: 31,
                date: '2016-05-01',
                name: 'wangxiaohu',
                address: 'No. 189, Grove St',
            },
            {
                id: 32,
                date: '2016-05-01',
                name: 'wangxiaohu',
                address: 'No. 189, Grove St',
            },
        ],
    },
    {
        id: 4,
        date: '2016-05-03',
        name: 'wangxiaohu',
        address: 'No. 189, Grove St',
    },
]

const tableData1: User[] = [
    {
        id: 1,
        date: '2016-05-02',
        name: 'wangxiaohu',
        address: 'No. 189, Grove St',
    },
    {
        id: 2,
        date: '2016-05-04',
        name: 'wangxiaohu',
        address: 'No. 189, Grove St',
    },
    {
        id: 3,
        date: '2016-05-01',
        name: 'wangxiaohu',
        hasChildren: true,
        address: 'No. 189, Grove St',
    },
    {
        id: 4,
        date: '2016-05-03',
        name: 'wangxiaohu',
        address: 'No. 189, Grove St',
    },
]
</script>