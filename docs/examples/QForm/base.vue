<template>
    <QForm ref="formRef" label-width="125px" :model="FormValue" :formOptions="formOptions"
        :buttons="['search', 'reset', { label: '自定义提交按钮', type: 'submit' }]" @search="onSearch">
        <template #customslot>
            <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
        </template>
    </QForm>
</template>

<script setup lang="ts" name="base">
import { ref } from "vue";
import { QForm, type FormItemRows } from "@meetjs/element-plus-kit";

const opts1 = [{ label: "选项1", value: "1" }, { label: "选项2", value: "2" }];

const opts = ref(opts1);
const data = [
    {
        value: '1',
        label: 'Level one 1',
        children: [
            {
                value: '1-1',
                label: 'Level two 1-1',
                children: [
                    {
                        value: '1-1-1',
                        label: 'Level three 1-1-1',
                    },
                ],
            },
        ],
    },
    {
        value: '2',
        label: 'Level one 2',
        children: [
            {
                value: '2-1',
                label: 'Level two 2-1',
                children: [
                    {
                        value: '2-1-1',
                        label: 'Level three 2-1-1',
                    },
                ],
            },
            {
                value: '2-2',
                label: 'Level two 2-2',
                children: [
                    {
                        value: '2-2-1',
                        label: 'Level three 2-2-1',
                    },
                ],
            },
        ],
    },
    {
        value: '3',
        label: 'Level one 3',
        children: [
            {
                value: '3-1',
                label: 'Level two 3-1',
                children: [
                    {
                        value: '3-1-1',
                        label: 'Level three 3-1-1',
                    },
                ],
            },
            {
                value: '3-2',
                label: 'Level two 3-2',
                children: [
                    {
                        value: '3-2-1',
                        label: 'Level three 3-2-1',
                    },
                ],
            },
        ],
    },
]

const formRef = ref<any>(null);
const FormValue = ref({
    name: "我爱你中国",
    sex: 1,
    count10: "我是text",
    html1: `<font color="red" size="5">我是html</font>`
});
const formOptions = ref<FormItemRows[]>([
    { type: "input", label: "输入框", prop: "name" },
    { type: "textarea", label: "文本域", prop: "textarea" },
    { type: "input-number", label: "数字输入", prop: "count", },
    { type: "radio", label: "单选框", prop: "sex", required: false, options: opts.value, },
    { type: "checkbox", label: "多选框", prop: "checkbox", options: opts.value, },
    { type: "select", label: "选择器", prop: "region", options: opts.value, },
    { type: "select-v2", label: "虚拟化选择器", prop: "count1", options: opts.value },
    { type: "cascader", label: "级联选择器", prop: "count2", },
    { type: "tree-select", label: "树形选择", prop: "treeSelect", options: data },
    { type: "time-select", label: "时间选择", prop: "count3", },
    { type: "slider", label: "滑块", prop: "count8" },
    { type: "switch", label: "开关", prop: "count9" },
    { type: "date-picker", label: "日期(时间)选择器", prop: "count4", attrs: { type: "datetime" }, },
    { type: "time-picker", label: "时间选择器", prop: "count5" },
    { type: "rate", label: "评分", prop: "count7" },
    { type: "color-picker", label: "颜色选择器", prop: "count6" },
    { type: "text", label: "渲染文本", prop: "count10" },
    { type: "html", label: "渲染html", prop: "html1" },
    { type: "slot", label: "自定插槽", prop: "customslot", },
]);

const onSearch = () => {
    console.log(FormValue.value);
};

</script>
<style lang="scss" scoped></style>