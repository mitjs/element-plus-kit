<template>
    <div class="2222">
        <quick-form ref="formRef" require-asterisk-position="right" label-width="120px" :model="FormValue"
            :form-options="formOptions" @validate="onValidate" required @change="onChange" :col="6"
            :buttons="['search', { label: 'ss', type: 'cancel' }, 'reset']" @search="onSearch" @input="onInput">
            <!--  :rules="rules"  -->
            <!-- <QuickTable></QuickTable> -->
            <!--  :rules="rules"  -->
            <!-- <el-button>123</el-button>
            <el-button>123</el-button>
            <el-button>123</el-button>
            <el-button>123</el-button>
            <el-button>123</el-button> -->
        </quick-form>

        <el-radio-group v-model="radio1">
            <el-radio label="a1">Option 1</el-radio>
            <el-radio label="a2">Option 2</el-radio>
        </el-radio-group>
        {{ radio1 }}
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive, h } from "vue";
import type { FormRules } from "element-plus";
import { QuickForm, QuickTable } from "meetjs-design";

const radio1 = ref('a1')
const FormValue = ref({
    name: "",
    sex: 1,
    count10: "我是text",
});

const opts1 = [{ label: "11", value: "111" }];
const opts2 = [
    { label: "22", value: "2" },
    { label: "33", value: "3" },
];
const opts = ref(opts1);
const formOptions = ref([

    { type: "input-number", label: "年龄", prop: "count" },
    {
        type: "radio",
        label: "radio",
        prop: "sex",
        options: [
            { label: "12", value: 1 },
            { label: "22", value: 2 },
        ],
    },
    {
        type: "checkbox",
        label: "checkbox",
        prop: "checkbox",
        options: opts.value,
        component: {
            child: {
                border: true
            }
        },
        vIf: (formValue: any) => {
            console.log("vIf---sex", formValue.sex, formValue.sex == 1, radio1.value);
            return radio1.value == 'a1';
        }
    },
    {
        type: "select", label: "select", prop: "region", options: opts.value,
        vIf: (vals: any) => {
            return vals.sex == 1;
        }
    },
    {
        type: "select-v2",
        label: "select-v2",
        prop: "count1",
        options: opts.value, vIf: (vals: any) => {
            return vals.sex == 1;
        }
    },
    {
        type: "cascader", label: "cascader", prop: "count2", vIf: (vals: any) => {
            return vals.sex == 1;
        }
    },
    {
        type: "time-select", label: "time-select", prop: "count3", vIf: (vals: any) => {
            return vals.sex == 1;
        }
    },
    {
        type: "date-picker",
        label: "date-picker",
        prop: "count4",
        component: { type: "datetime" }, vIf: (vals: any) => {
            return vals.sex == 1;
        }
    },
    { type: "time-picker", label: "time-picker", prop: "count5" },
    { type: "color-picker", label: "color-picker", prop: "count6" },
    { type: "rate", label: "rate", prop: "count7" },
    { type: "slider", label: "slider", prop: "count8" },
    { type: "switch", label: "switch", prop: "count9" },
    { type: "text", label: "text", prop: "count10" },
    { type: "slot", label: "slot", prop: "count11" },
    { type: "textarea", label: "textarea", prop: "textarea" },
    {
        type: "input",
        label: "2222",
        prop: "name",
        // col: 24,
        formItem: { required: false, "label-suffix": "" },
        attrs: {
            onInput: () => {
                console.log("input", 8789789);
            },
            onBlur: (e: any) => {
                console.log("onBlur", e);
            },
        },
    },

]);
const formRef = ref<any>(null);

const validatePass = (rule: any, value: any, callback: any) => {
    if (value === "") {
        callback(new Error("Please input the password"));
    } else {
        if (FormValue.value.name !== "") {
            if (!formRef.value) return;
            formRef.value.validateField("name", () => null);
        }
        callback();
    }
};
const onInput = (value: any, prop: string) => {
    // console.log("onInput====", value, prop);
};

const rules = reactive<FormRules<{ [k: string]: any }>>({
    name: [
        {
            required: true,
            message: "Please select Activity zone",
            trigger: "blur",
        },
        { min: 3, max: 5, message: "Length should be 3 to 5", trigger: "blur" },
    ],
    region: [
        {
            required: true,
            message: "Please select Activity zone",
            trigger: "change",
        },
    ],
    count: [
        {
            required: true,
            message: "Please select Activity count",
            trigger: "change",
        },
    ],
    date1: [
        {
            type: "date",
            required: true,
            message: "Please pick a date",
            trigger: "change",
        },
    ],
    date2: [
        {
            type: "date",
            required: true,
            message: "Please pick a time",
            trigger: "change",
        },
    ],
    type: [
        {
            type: "array",
            required: true,
            message: "Please select at least one activity type",
            trigger: "change",
        },
    ],
    resource: [
        {
            required: true,
            message: "Please select activity resource",
            trigger: "change",
        },
    ],
    desc: [
        { required: true, message: "Please input activity form", trigger: "blur" },
    ],
});

const onValidate = (prop: any, isValid: boolean, message: string) => {
    // console.log(prop, isValid, message);
};

const onChange = (...arg: any) => {
    // console.log("onChange==== ", ...arg);
};
const onSearch = () => {
    console.log(FormValue.value);
    formRef.value.validate((vaild) => {
        console.log(vaild);

    })
};
setTimeout(() => {
    console.log("formRef", formRef.value);
    FormValue.value.name = "我爱你中国";
    opts.value = opts2;
    console.log(opts.value);

}, 2000);
</script>
<style lang="scss" scoped>
:deep() {
    .cc {
        color: red;
    }
}
</style>
