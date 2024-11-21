<template>
    <quick-form ref="formRef" label-width="120px" :model="FormValue" :form-options="formOptions"
        :buttons="['search', 'reset']" @search="onSearch">
        <template #customslot>
            <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
        </template>
    </quick-form>
</template>

<script setup lang="ts" name="base">
import { ref, reactive, h } from "vue";
import { QuickForm, QuickTable } from "@meetjs/element-plus-kit";
// import type {} from '@meetjs/element-plus-kit'

const opts1 = [{ label: "选项1", value: "1" }, { label: "选项2", value: "2" }];

const opts = ref(opts1);
const formRef = ref<any>(null);
const FormValue = ref({
    name: "我爱你中国",
    sex: 1,
    count10: "我是text",
    html1: `<font color="red" size="5">我是html</font>`
});
const formOptions = ref([
    { type: "input", label: "input", prop: "name" },
    { type: "textarea", label: "textarea", prop: "textarea" },
    { type: "input-number", label: "input-number", prop: "count", },
    { type: "radio", label: "radio", prop: "sex", required: false, options: opts.value, },
    { type: "checkbox", label: "checkbox", prop: "checkbox", options: opts.value, },
    { type: "select", label: "select", prop: "region", options: opts.value, },
    { type: "select-v2", label: "select-v2", prop: "count1", options: opts.value },
    { type: "cascader", label: "cascader", prop: "count2", },
    { type: "tree-select", label: "tree-select", prop: "treeSelect", },
    { type: "time-select", label: "time-select", prop: "count3", },
    { type: "slider", label: "slider", prop: "count8" },
    { type: "switch", label: "switch", prop: "count9" },
    { type: "date-picker", label: "date-picker", prop: "count4", attrs: { type: "datetime" }, },
    { type: "time-picker", label: "time-picker", prop: "count5" },
    { type: "rate", label: "rate", prop: "count7" },
    { type: "color-picker", label: "color-picker", prop: "count6" },
    { type: "text", label: "渲染文本", prop: "count10" },
    { type: "html", label: "渲染html", prop: "html1" },
    { type: "slot", label: "自定插槽", prop: "customslot", },
]);

const onSearch = () => {
    console.log(FormValue.value);
};
</script>
<style lang="scss" scoped></style>