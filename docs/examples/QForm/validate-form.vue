<template>
    <div class="2222">
        <QForm ref="formRef" require-asterisk-position="right" label-width="120px" :model="FormValue" :rules="rules"
            :form-options="formOptions" @validate="onValidate" required @change="onChange"
            :buttons="['search', 'reset']" @search="onSearch" @input="onInput">

        </QForm>
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive, h } from "vue";
import type { FormRules } from "element-plus";
import { QForm, type FormItemRows } from "@meetjs/element-plus-kit";

const FormValue = ref<any>({
    customVaild: ''
});
const formRef = ref<any>(null);

const opts2 = [
    { label: "华为", value: "2" },
    { label: "小米", value: "3" },
    { label: "苹果", value: "4" },
    { label: "锤子", value: "5" },
];

const validatePass = (rule: any, value: any, callback: any) => {
    if (value === "") {
        callback(new Error("请输入内容"));
    } else {
        if (value !== "") {
            if (!formRef.value) return;
            formRef.value.validateField("customVaild", () => null);
        }
        callback();
    }
};

const formOptions = ref<FormItemRows[]>([
    {
        type: "input",
        label: "自定义检验方法",
        prop: "customVaild",
        formItem: { rules: [{ validator: validatePass, trigger: "blur" }] },
        attrs: {
            onInput: (e) => {
                console.log("input", e);
            },
            onBlur: (e: any) => {
                console.log("onBlur", e);
            },
        },
    },
    {
        type: "input",
        label: "rule配置校验",
        prop: "name",
    },
    {
        type: "input",
        label: "邮箱校验",
        prop: "email",
        formItem: {
            required: true,
            rules: [
                {
                    type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'],
                },
            ],
        },
    },
    {
        type: "date-picker",
        label: "日期校验",
        prop: "date",
        attrs: {
            type: "datetime",
        },
    },
    {
        type: "checkbox",
        label: "多选框",
        prop: "checkbox",
        options: opts2,

    },
]);

const rules = reactive<FormRules<{ [k: string]: any }>>({
    name: [
        {
            required: true,
            message: "不能为空",
            trigger: "blur",
        },
        { min: 3, max: 5, message: "长度在 3 - 5 个字符", trigger: "blur" },
    ],
    date: [
        {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change",
        },
    ],
    checkbox: [
        {
            type: "array",
            required: true,
            message: "至少选择一个选项",
            trigger: "change",
        },
    ],
});


/* 表单输入时触发 */
const onInput = (value: any, prop: string) => {
    // console.log("onInput====", value, prop);
};


/* 表单校验时触发 */
const onValidate = (prop: any, isValid: boolean, message: string) => {
    // console.log(prop, isValid, message);
};

/* 表单值改变时触发 */
const onChange = (...arg: any) => {
    // console.log("onChange==== ", ...arg);
};

/* 点击搜索按钮触发 */
const onSearch = () => {
    console.log(FormValue.value);
    formRef.value.validate((vaild) => {
        console.log(vaild);

    })
};

</script>
