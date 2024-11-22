<template>
    <quick-form ref="formRef" label-width="100px" :gutter="20" :col="12" :model="FormValue" :form-options="formOptions"
        :label-position="FormValue.formPos" :size="FormValue.formSize">
        <el-button type="primary" round>Primary</el-button>
        <el-button type="success" round>Success</el-button>
        <el-button type="info" round>Info</el-button>
        <el-button type="warning" round>Warning</el-button>
        <el-button type="danger" round>Danger</el-button>
    </quick-form>
</template>

<script setup lang="ts" name="base">
import { ref, reactive } from "vue";
import { QuickForm } from "@meetjs/element-plus-kit";

const opts1 = [{ label: "选项1", value: "1" }, { label: "选项2", value: "2" }];

const opts = ref(opts1);
const formRef = ref<any>(null);
const FormValue = ref({
    formPos: 'top',
    formItemPos: 'left',
    formSize: 'default'
});

const formOptions = reactive([
    {
        type: "radio", label: "Form", prop: "formPos", options: [
            { lable: 'Left', value: 'left' }, { lable: 'top', value: 'top' }, { lable: 'Right', value: 'right' }
        ],
        attrs: { button: true }
    },
    {
        type: "radio", label: "Size", prop: "formSize", options: [
            { lable: 'Large', value: 'large' }, { lable: 'Default', value: 'default' }, { lable: 'Small', value: 'small' }
        ],
        attrs: { button: true }
    },
    { type: "input", label: "输入", prop: "name", },
    { type: "select", label: "选择", prop: "region", options: opts.value, },
    { type: "date-picker", label: "时间", prop: "count4", attrs: { type: "date" }, },
    { type: "textarea", label: "文本域", prop: "textarea", col: 24 },
]);

const onSearch = () => {
    console.log(FormValue.value);
};
</script>
<style lang="scss" scoped></style>