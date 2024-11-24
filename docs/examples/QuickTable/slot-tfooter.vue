<template>
    <div class="">
        <p>
            如果设置了 <code>tfooter</code> 插槽，配置的 <code>page</code> 和 <code>page-config</code> 参数将失效
        </p>
        <QuickTable :title="title" :data="tableData" :columns="columns" v-model:page="page">
            <template #headerRight>
                <el-button type="primary">导出</el-button>
            </template>
            <template #tfooter>
                <div style="padding: 10px 0;color:red">重新设置尾部区域内容</div>
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



const tableData = ref([
    { name: '张三', age: 18, sex: '男' },
    { name: '李四', age: 20, sex: '女' },
    { name: '王五', age: 25, sex: '男' },
])
const columns = ref([
    { prop: 'name', label: '姓名' },
    { prop: 'age', label: '年龄' },
    { prop: 'sex', label: '性别' },
])



</script>