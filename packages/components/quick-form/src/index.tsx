import { defineComponent, ref, toRefs, defineExpose, watch, provide, onMounted, computed, effect, reactive, VNode } from 'vue'
import QFormItem from './qf-item'
import type { ItemRowProps, Arrayable, BtnType, BtnTypeObj } from '../types'
import type { FormInstance, FormValidateCallback, FormItemProp, FormRules } from 'element-plus'
import { findFirstHaveColFormItem } from './utils'
import { QFromProps } from './props'

export default defineComponent({
    name: 'FormGenerator',
    props: QFromProps,
    emits: ['change', 'validate', 'search', 'reset', 'cancel', 'submit'],
    setup(props, { attrs, slots, emit, expose }) {
        const { col, buttons, formOptions, required, rules } = toRefs(props);
        console.log('slots', slots);

        const formRef = ref<FormInstance>()
        let newRules = reactive<FormRules<Record<string, any>>>({})

        const fCol = findFirstHaveColFormItem(formOptions.value) /* 第一个设置栅格的表单项 */
        const globalCol = col.value || fCol /* 计算栅格布局值 */
        const isLayout = ref(globalCol ? true : false)  /* 是否开启layout布局 */

        // 处理 rules 副作用
        effect(() => {
            if (required.value && !rules.value) {
                formOptions.value.forEach(item => {
                    newRules[item.prop] = [{ required: true, message: `${typeof item.label == 'string' ? item.label : item.prop}不能为空`, trigger: ['blur', 'change'] }]
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
        const onBtnEvent = (event: BtnType): void => {
            emit(event)
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
            formSlots: Record<string, any>;
            validate: (callback?: FormValidateCallback) => Promise<void>;
            change: (value: any, prop: string) => void
            btnEvent: (event: BtnType) => void
        }>('formObserver', {
            buttons: buttons.value,
            formSlots: slots,
            validate: validate,
            change: onChange,
            btnEvent: onBtnEvent
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
        const { model, newRules, formOptions, isLayout, attrs, gutter, globalCol, onValidate } = this;

        // 渲染formitem项
        const rowRenderer = () => {
            return <>
                <QFormItem formValue={model} formOptions={formOptions} isLayout={isLayout} globalCol={globalCol} ></QFormItem>
            </>
        }

        return <>
            <el-form ref="formRef" model={model} rules={newRules}  {...attrs} onValidate={onValidate}>
                {isLayout ? <el-row gutter={gutter}>{rowRenderer()}</el-row> : rowRenderer()}
            </el-form>
        </>
    },
})

