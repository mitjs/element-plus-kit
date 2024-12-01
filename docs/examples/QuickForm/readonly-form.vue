<template>
    <quick-form ref="formRef" label-width="125px" readonly :model="FormValue" :form-options="formOptions">
        <template #customslot>
            <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
        </template>
    </quick-form>
</template>

<script setup lang="ts" name="base">
import { ref } from "vue";
import { QuickForm } from "@meetjs/element-plus-kit";

const opts1 = [{ label: "选项1", value: "1" }, { label: "选项2", value: "2" }, { label: "选项3", value: "3" }];

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
const options = ref([
    {
        value: 'guide',
        label: 'Guide',
        children: [
            {
                value: 'disciplines',
                label: 'Disciplines',
                children: [
                    {
                        value: 'consistency',
                        label: 'Consistency',
                    },
                    {
                        value: 'feedback',
                        label: 'Feedback',
                    },
                ],
            },
            {
                value: 'navigation',
                label: 'Navigation',
                children: [
                    {
                        value: 'side nav',
                        label: 'Side Navigation',
                    },
                    {
                        value: 'top nav',
                        label: 'Top Navigation',
                    },
                ],
            },
        ],
    },
    {
        value: 'component',
        label: 'Component',
        children: [
            {
                value: 'basic',
                label: 'Basic',
                children: [
                    {
                        value: 'layout',
                        label: 'Layout',
                    },
                    {
                        value: 'color',
                        label: 'Color',
                    },
                ],
            },
            {
                value: 'form',
                label: 'Form',
                children: [
                    {
                        value: 'radio',
                        label: 'Radio',
                    },
                    {
                        value: 'checkbox',
                        label: 'Checkbox',
                    },
                    {
                        value: 'input',
                        label: 'Input',
                    },
                    {
                        value: 'input-number',
                        label: 'InputNumber',
                    },
                ],
            },
            {
                value: 'data',
                label: 'Data',
                children: [
                    {
                        value: 'table',
                        label: 'Table',
                    },
                    {
                        value: 'tag',
                        label: 'Tag',
                    },
                ],
            },
            {
                value: 'notice',
                label: 'Notice',
                children: [
                    {
                        value: 'alert',
                        label: 'Alert',
                    },
                    {
                        value: 'loading',
                        label: 'Loading',
                    },
                ],
            },
            {
                value: 'navigation',
                label: 'Navigation',
                children: [
                    {
                        value: 'menu',
                        label: 'Menu',
                    },
                    {
                        value: 'tabs',
                        label: 'Tabs',
                    },
                ],
            },

        ],
    },

])

const formRef = ref<any>(null);
const FormValue = ref({
    name: "我爱你中国",
    textarea: "我爱中国",
    count: 100,
    sex: '1',
    checkbox: ['1', '2'],
    region: '1',
    count1: "1",
    count2: ['menu', 'tag'],
    treeSelect: '1-1-1',
    count3: "12:00:00",
    count4: '2024-11-06 00:00:00',
    count5: "16:44:18",
    count8: 10,
    count9: true,
    count7: 3.5,
    count6: '#ff0000',
    count10: "我是text",
    html1: `<font color="red" size="5">我是html</font>`
});
const formOptions = ref([
    { type: "input", label: "输入框", prop: "name" },
    { type: "textarea", label: "文本域", prop: "textarea" },
    { type: "input-number", label: "数字输入", prop: "count", },
    { type: "radio", label: "单选框", prop: "sex", required: false, options: opts.value, },
    { type: "checkbox", label: "多选框", prop: "checkbox", options: opts.value, },
    { type: "select", label: "选择器", prop: "region", options: opts.value, },
    { type: "select-v2", label: "虚拟化选择器", prop: "count1", options: opts.value },
    { type: "cascader", label: "级联选择器", prop: "count2", options: options.value, attrs: { props: { multiple: true } } },
    { type: "tree-select", label: "树形选择", prop: "treeSelect", options: data },
    { type: "time-select", label: "时间选择", prop: "count3", },
    { type: "date-picker", label: "日期(时间)选择器", prop: "count4", attrs: { type: "datetime" }, },
    { type: "time-picker", label: "时间选择器", prop: "count5" },
    { type: "slider", label: "滑块", prop: "count8" },
    { type: "switch", label: "开关", prop: "count9" },
    { type: "rate", label: "评分", prop: "count7" },
]);

const onSearch = () => {
    console.log(FormValue.value);
};

</script>
<style lang="scss" scoped></style>