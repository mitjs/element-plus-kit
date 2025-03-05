<template>
    <div class="2222">
        外部控制显隐：<el-radio-group v-model="trigger">
            <el-radio-button label="1">显示</el-radio-button>
            <el-radio-button label="2">隐藏</el-radio-button>
        </el-radio-group>
        <hr>
        <QForm ref="formRef" label-width="120px" :model="FormValue" :form-options="formOptions">
        </QForm>
    </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { QForm, type FormItemRows } from "@meetjs/element-plus-kit";

const trigger = ref("1");
const FormValue = ref({
});

const opts1 = [{ label: "11", value: "111" }];

const opts = ref(opts1);

const formRef = ref<any>(null);

const formOptions = ref<FormItemRows[]>([
    {
        type: "input",
        label: "输入框",
        prop: "name",

    },
    {
        type: "select", label: "选择器", prop: "region", options: opts.value,
        vIf: (vals: any) => {
            return trigger.value == '1';
        }
    },


    {
        type: "date-picker",
        label: "日期选择器",
        prop: "count4",
        vIf: (vals: any) => {
            return trigger.value == '1';
        }
    },
    {
        type: "rate", label: "评分", prop: "count7", vIf: (vals: any) => {
            return trigger.value == '2';
        }
    },
    {
        type: "slider", label: "滑块", prop: "count8", vIf: (vals: any) => {
            return trigger.value == '2';
        }
    },
    { type: "textarea", label: "文本域", prop: "textarea" },
]);
</script>
