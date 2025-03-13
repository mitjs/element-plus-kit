import { computed, defineComponent, provide, ref, renderSlot, type ExtractPropTypes, type PropType } from "vue";
import { createNamespace } from '@elementplus-kit/utils'
import {
    ElCol, ElConfigProvider, ElForm, ElRow, formProps,
    type FormValidateCallback,
    type FormItemProp,
    ElFormItem,
} from 'element-plus'
import type { FormItemRows, BtnTypeUnit, FormProvideProps, ProvideEventNames } from "./types";
import zhCn from "element-plus/es/locale/lang/zh-cn";
import { has, isArray, isBoolean, isFunction, isNumber, } from "lodash-es";
import QFormItem from './FormItem'
import FormButton from "./FormButton";

const [name] = createNamespace('form')

export const qformProps = Object.assign({}, formProps, {
    model: {
        type: Object,
        required: true,
        default: () => ({})
    },
    formOptions: {
        type: Object as PropType<FormItemRows[]>,
        required: true,
        default: () => []
    },
    required: {
        type: Boolean,
        default: false
    },
    gutter: {
        type: Number,
        required: false,
    },
    col: {
        type: Number,
        required: false,
    },
    buttons: {
        type: Array as PropType<Array<BtnTypeUnit>>,
        required: false,
        default: () => [],
    },

    readonly: {
        type: Boolean,
        required: false,
    },
})

export type QFormProps = ExtractPropTypes<typeof qformProps>

export default defineComponent({
    name,
    props: qformProps,
    emits: ["search", "reset", "cancel", "submit", "validate", "change", "input", 'clear', 'blur', 'focus', 'expand-change', 'visible-change', 'remove-tag', 'active-change'],
    setup(props, { slots, emit, attrs, expose }) {
        const { model, col, gutter, readonly, formOptions, buttons, required } = props

        const formRef = ref<InstanceType<typeof ElForm> | null>()
        const isLayout = computed(() => gutter || col || formOptions.some((item: FormItemRows) => has(item, 'col')))
        const newProps = computed(() => props)
        const onVaildate = (...args: any) => emit('validate', ...args)

        provide<FormProvideProps>('formContext', {
            formSlots: slots,
            events: (e: ProvideEventNames, ...args: any) => {
                if (e == 'reset') {
                    formRef.value?.resetFields()
                }
                emit(e, ...args)
            }
        })

        expose({
            validate: async (callback?: FormValidateCallback | undefined) => {
                formRef.value?.validate(callback);
            },
            validateField: (
                props?: Arrayable<FormItemProp> | undefined,
                callback?: FormValidateCallback | undefined
            ) => formRef.value?.validateField(props, callback),
            resetFields: (props?: Arrayable<FormItemProp> | undefined) => formRef.value?.resetFields(props),
            scrollToField: (prop: FormItemProp) =>
                formRef.value?.scrollToField(prop),
            clearValidate: (props?: Arrayable<FormItemProp> | undefined) =>
                formRef.value?.clearValidate(props),
        })

        const renderItem = (item: FormItemRows) => {
            const { label, prop, type, formItem } = item
            return <QFormItem
                key={prop}
                model={model}
                label={label as string}
                type={type}
                name={prop}
                allRequired={required}
                isReadonly={readonly}
                config={item}
                itemProps={formItem}
                compProps={item.attrs}
            >
            </QFormItem>
        }

        const isActive = (row: FormItemRows): boolean => {
            if (!has(row, 'vIf')) {
                return true
            } else {
                if (isBoolean(row['vIf'])) {
                    return row['vIf']
                } else if (isFunction(row['vIf'])) {
                    return row['vIf'](model)
                } else {
                    new Error('vIf must be a boolean or function')
                    return false
                }
            }
        }
        const getColNum = (row: FormItemRows): number => {
            if (has(row, 'col') && isNumber(row['col'])) {
                return row['col']
            } else if (has(props, 'col') && isNumber(props['col'])) {
                return props.col
            } else {
                return 24
            }
        }
        const renderRow = () => {
            return <>
                {
                    formOptions.map(item => {
                        if (isActive(item)) {
                            if (isLayout.value) {
                                return <ElCol key={item.prop} span={getColNum(item)}>{renderItem(item)}</ElCol>
                            }
                            return renderItem(item)
                        }
                        return null

                    })
                }
            </>
        }

        const renderButton = () => {
            if (has(slots, 'default') && renderSlot(slots, 'default').children?.length) {
                return <ElFormItem labelWidth={0}>{renderSlot(slots, 'default')}</ElFormItem>
            }

            if (isArray(buttons) && buttons.length) {
                return <ElFormItem labelWidth={0}>
                    <FormButton buttons={buttons} />
                </ElFormItem>
            }

            return null
        }

        return () => (
            <ElConfigProvider locale={zhCn}>
                <ElForm ref={formRef} {...newProps.value} model={model} onValidate={onVaildate} {...attrs}>
                    {isLayout.value ?
                        <ElRow gutter={gutter || 0}>
                            {renderRow()}
                        </ElRow>
                        : renderRow()}
                    {renderButton()}
                </ElForm>
            </ElConfigProvider>
        )
    }
})