<template>
    <div class="">
        <h4 style="margin: 10px 0;color: var(--el-color-primary);">第一种：直接自定义头部区域</h4>
        <QuickTable :title="title" :data="tableData" :columns="columns">
            <template #theader>
                <div style="text-align: center;line-height: 36px; font-weight: 600;">我是自定义头部</div>
            </template>
        </QuickTable>
        <hr>
        <h4 style="margin: 10px 0;color: var(--el-color-primary);">第二种：自定义头部左侧和右侧区域</h4>
        <p>
            左侧如果是标题，可直接配置<code>title</code>属性内容即可，如果是按钮，则使用插槽<code>headerLeft</code>和<code>headerRight</code>进行自定义
        </p>
        <QuickTable :title="title" :data="tableData" :columns="columns">
            <template #headerRight>
                <el-button type="primary">导出</el-button>
            </template>
        </QuickTable>
        <hr>
        <QuickTable :data="tableData" :columns="columns">
            <template #headerLeft>
                <el-button type="primary">新增</el-button>
            </template>
            <template #headerRight>
                <el-button type="primary">导出</el-button>
            </template>
        </QuickTable>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { QuickTable } from '@meetjs/element-plus-kit'

const title = ref('用户信息表')

const tableData = ref([
    { name: '张三', age: 18, sex: '男' },
    { name: '李四', age: 20, sex: '女' },
])
const columns = ref([
    { prop: 'name', label: '姓名' },
    { prop: 'age', label: '年龄' },
    { prop: 'sex', label: '性别' },
])

</script>