<template>
    <div class="2222">
        <quick-form ref="formRef" label-width="120px" :model="FormValue" :form-options="formOptions">
        </quick-form>
    </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { QuickForm, } from "@meetjs/element-plus-kit";

const FormValue = ref({
    isShow: 1,
});

const opts1 = [{ label: "11", value: "111" }];

const opts = ref(opts1);
const formOptions = ref([
    {
        type: "radio",
        label: "显隐控制",
        prop: "isShow",
        options: [
            { label: "显示", value: 1 },
            { label: "隐藏", value: 2 },
        ],
        attrs: {
            button: true,
        },
    },
    {
        type: "input",
        label: "输入框",
        prop: "name",
    },
    {
        type: "select", label: "选择器", prop: "region", options: opts.value,
        vIf: (vals: any) => {
            return vals.isShow == 1;
        }
    },
    {
        type: "date-picker",
        label: "日期选择器",
        prop: "count4",
        vIf: (vals: any) => {
            return vals.isShow == 1;
        }
    },
    {
        type: "rate", label: "评分", prop: "count7", vIf: (vals: any) => {
            return vals.isShow == 2;
        }
    },
    {
        type: "slider", label: "滑块", prop: "count8", vIf: (vals: any) => {
            return vals.isShow == 2;
        }
    },
    { type: "textarea", label: "文本域", prop: "textarea" },


]);
const formRef = ref<any>(null);


</script>
