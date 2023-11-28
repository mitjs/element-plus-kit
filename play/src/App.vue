<template>
    <div class="">
        <h1>12312312</h1>
        <QuickForm ref="formRef" :model="FormValue" :rules="rules" :form-options="formOptions" :gutter="20" :col="12"
            label-suffix="：" @validate="onValidate" @change="onChange">
        </QuickForm>
        <!--  :rules="rules"  -->
        <!-- <form1></form1> -->
    </div>
</template>


<script lang="ts" setup>
import { ref, reactive } from 'vue'
import type { FormRules, } from 'element-plus'
import { QuickForm } from 'meetjs-design'
import form1 from './from.vue'

const FormValue = ref({
    name: '',
    sex: 1
})
const opts1 = [{ label: '11', value: '111' }]
const opts2 = [{ label: '22', value: '2' }, { label: '33', value: '3' }]
const opts = ref(opts1)
const formOptions = ref([
    {
        type: 'input', label: '姓名', prop: 'name', component: {
            onInput: () => {
                console.log('input', 8789789);
            },
            onBlur: (e) => {
                console.log('onBlur', e);
            }
        }
    },
    { type: 'input-number', label: '年龄', prop: 'count', },
    { type: 'radio', label: '性别', prop: 'sex', options: [{ label: '12', value: 1 }, { label: '22', value: 2 }], },
    { type: 'select', label: '爱好', prop: 'region', options: opts.value }
])
const formRef = ref<any>(null)


const validatePass = (rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('Please input the password'))
    } else {
        if (FormValue.value.name !== '') {
            if (!formRef.value) return
            formRef.value.validateField('name', () => null)
        }
        callback()
    }
}
const rules = reactive<FormRules<{ [k: string]: any }>>({
    name: [
        {
            required: true,
            message: 'Please select Activity zone', trigger: 'blur'
        },
        { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
    ],
    region: [
        {
            required: true,
            message: 'Please select Activity zone',
            trigger: 'change',
        },
    ],
    count: [
        {
            required: true,
            message: 'Please select Activity count',
            trigger: 'change',
        },
    ],
    date1: [
        {
            type: 'date',
            required: true,
            message: 'Please pick a date',
            trigger: 'change',
        },
    ],
    date2: [
        {
            type: 'date',
            required: true,
            message: 'Please pick a time',
            trigger: 'change',
        },
    ],
    type: [
        {
            type: 'array',
            required: true,
            message: 'Please select at least one activity type',
            trigger: 'change',
        },
    ],
    resource: [
        {
            required: true,
            message: 'Please select activity resource',
            trigger: 'change',
        },
    ],
    desc: [
        { required: true, message: 'Please input activity form', trigger: 'blur' },
    ],
})

const onValidate = (prop: any, isValid: boolean, message: string) => {
    // console.log(prop, isValid, message);
}

const onChange = (value: any, prop: string) => {
    console.log('onChange====', value, prop);
}

setTimeout(() => {
    console.log('formRef', formRef.value);
    FormValue.value.name = '我爱你中国'
    opts.value = opts2
}, 2000)

// 监听
// watch(FormValue, (val) => {
//     console.log(val)
// })
</script>
<style lang="scss" scoped></style>