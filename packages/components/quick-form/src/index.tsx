import { defineComponent, ref, toRefs, defineExpose, watch, provide, PropType, onMounted, computed, effect, reactive, } from 'vue'
import FormGroup from './form-group'
import type { ItemRowProps, Arrayable, BtnTypeObj } from '../types'
import type { FormInstance, FormValidateCallback, FormValidationResult, FormItemProp, FormRules } from 'element-plus'

const Props = {
    model: {
        type: Object,
        required: true,
        default: () => { }
    },
    rules: {
        type: Object,
        required: false,
        default: () => { }
    },
    required: Boolean,
    gutter: Number,
    col: Number,
    formOptions: {
        type: Array as PropType<Array<ItemRowProps>>,
        required: true,
        default: () => []
    },
    buttons: {
        type: Array as PropType<Array<BtnTypeObj>>,
        required: false,
        default: () => []
    }
}

export default defineComponent({
    name: 'FormGenerator',
    props: Props,
    emits: ['change', 'validate'],
    setup(props, { attrs, slots, emit, expose }) {
        const { col, buttons, formOptions, required, rules } = toRefs(props);

        const formRef = ref<FormInstance>()
        let newRules = reactive<FormRules<Record<string, any>>>({})

        const fCol = findFirstHaveColFormItem(formOptions.value) /* 第一个设置栅格的表单项 */
        const globalCol = col.value || fCol /* 计算栅格布局值 */
        const isLayout = ref(globalCol ? true : false)  /* 是否开启layout布局 */

        // 处理 rules 副作用
        effect(() => {
            if (required.value && !rules.value) {
                formOptions.value.forEach(item => {
                    newRules[item.prop] = [{ required: true, message: `${item.label}不能为空`, trigger: ['blur', 'change'] }]
                })
            } else {
                newRules = { ...rules.value }
            }
        })

        /* ================================== form 事件触发 start ===================================== */
        const onChange = (value: any, prop: string,) => {
            emit('change', value, prop)
        }
        const onValidate = (prop: FormItemProp, isValid: boolean, message: string): void => {
            emit('validate', prop, isValid, message)
        }
        /* ================================== form 事件触发 end ===================================== */

        /* ================================== form 实例化方法 start ================================== */
        const validateField = (props?: Arrayable<FormItemProp> | undefined, callback?: FormValidateCallback | undefined) => formRef.value?.validateField(props, callback)
        const validate = async (
            callback?: FormValidateCallback
        ) => {
            formRef.value?.validate(callback)
        }
        const resetFields = (props?: Arrayable<FormItemProp> | undefined) => {
            formRef.value?.resetFields(props)
        }
        const scrollToField = (prop: FormItemProp) => formRef.value?.scrollToField(prop)
        const clearValidate = (props?: Arrayable<FormItemProp> | undefined) => formRef.value?.clearValidate(props)

        expose({
            validate,
            validateField,
            resetFields,
            scrollToField,
            clearValidate,
        })
        /* ================================== form 实例化方法 end ================================== */

        provide<{
            buttons: Arrayable<BtnTypeObj>;
            validate: (callback?: FormValidateCallback) => Promise<void>;
            change: (value: any, prop: string,) => void
        }>('formObserver', {
            buttons: buttons.value,
            validate: validate,
            change: onChange
        })

        return {
            formRef,
            ...toRefs(props),
            attrs,
            isLayout,
            globalCol,
            newRules,
            onValidate
        }
    },
    render() {
        const { model, newRules, formOptions, formRef, isLayout, attrs, gutter, globalCol, onValidate } = this;

        // 渲染formitem项
        const rowRenderer = () => {
            return <>
                <FormGroup formValue={model} formOptions={formOptions} isLayout={isLayout} globalCol={globalCol} ></FormGroup>
            </>
        }

        return <>
            <el-form ref="formRef" model={model} rules={newRules}  {...attrs} onValidate={onValidate}>
                {isLayout ? <el-row gutter={gutter}>{rowRenderer()}</el-row> : rowRenderer()}
            </el-form>
        </>
    },
})


// 查找第一个带Col的表单项
const findFirstHaveColFormItem = (list: ItemRowProps[]) => {
    const row = list.find(item => item.col)
    return row ? row.col : 0

}