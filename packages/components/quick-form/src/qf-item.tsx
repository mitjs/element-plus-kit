import { PropType, defineComponent, toRefs, inject } from 'vue'
import QFormComponent from './qf-component'
import QFormButton from './qf-button'
import type { CompTypes, IOptionRow, ItemRowProps, BtnTypeObj } from '../types'
export default defineComponent({
    props: {
        formValue: {
            type: Object,
            default: () => { }
        },
        formOptions: {
            type: Object as PropType<Array<ItemRowProps>>,
            required: false,
            default: () => []
        },
        required: Boolean,
        isLayout: Boolean,
        globalCol: Number,

    },
    setup(props, { attrs }) {
        const { buttons = [], formSlots }: Record<string, any> = inject('formObserver') as any
        return {
            ...toRefs(props), isButtons: buttons.length, formSlots
        }
    },
    render() {
        const { formOptions, formValue, isLayout, required, globalCol, isButtons, formSlots } = this;

        // 按钮组渲染器
        const buttonGroupRenderer = () => {
            return <el-form-item >
                <QFormButton></QFormButton>
            </el-form-item>
        }

        // 组件渲染器
        const componentRenderer = (item: ItemRowProps) => {
            const { label, prop, formItem, type, options, component } = item
            return <el-form-item label={label} prop={prop} {...formItem}   >
                <QFormComponent type={type} prop={prop} formValue={formValue} options={options} component={component} />
            </el-form-item>
        }

        // 布局渲染器
        const layoutRenderer = () => <>
            {
                formOptions.map((item: ItemRowProps) => {
                    const { col } = item;
                    return isLayout ? <el-col span={col || globalCol}>{componentRenderer(item)}</el-col> : componentRenderer(item)
                })
            }
            {formSlots.default ? formSlots.default() : isButtons ? buttonGroupRenderer() : null}
        </>

        return <>
            {layoutRenderer()}
        </>;
    },
})

// const handleRules = (required: boolean, row: Record<string, any>) => {
//     if (!required) return [];
//     const { formItem, label, } = row

//     const commonRules = [{ required: true, message: `${label}不能为空`, trigger: ['blur', 'change'] }]

//     if (formItem && formItem.rules) {
//         return [...formItem.rules, ...commonRules]
//     } else {
//         return commonRules
//     }
// }

/* 默认文案 */
// export const defaultPlaceholder = (
//     type: CompTypes,
//     text: string | undefined
// ): string => {
//     switch (type) {
//         case "input":
//         case "input-number":
//             return `请输入${text}`;
//         case "select":
//         case "time-select":
//         case "time-picker":
//         case "select-v2":
//             return `请选择${text}`;
//         default:
//             return "";
//     }
// };