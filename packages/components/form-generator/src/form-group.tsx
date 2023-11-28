import { PropType, defineComponent, toRefs, inject } from 'vue'
import AsyncComponent from './async-component'
import ButtonGroup from './button-group'
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
        // const { formValue, formOptions, isLayout, required, globalCol, } = toRefs(props);
        const { buttons = [] }: Record<string, any> = inject('formObserver') as any
        return {
            ...toRefs(props), isButtons: buttons.length,
        }
    },
    render() {
        const { formOptions, formValue, isLayout, required, globalCol, isButtons } = this;

        // 按钮组渲染器
        const buttonGroupRenderer = () => {
            return <el-form-item >
                <ButtonGroup></ButtonGroup>
            </el-form-item>
        }

        // 组件渲染器
        const componentRenderer = (item: ItemRowProps) => {
            const { label, prop, formItem, type, options, component } = item
            console.log('required', required);

            // rules={handleRules(required, item)}
            return <el-form-item label={label} prop={prop} {...formItem}   >
                <AsyncComponent type={type} prop={prop} formValue={formValue} options={options} component={component} />
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
            {isButtons ? buttonGroupRenderer() : null}
        </>

        return <>
            {layoutRenderer()}
        </>;
    },
})

const handleRules = (required: boolean, row: Record<string, any>) => {
    if (!required) return [];
    const { formItem, label, } = row

    const commonRules = [{ required: true, message: `${label}不能为空`, trigger: ['blur', 'change'] }]

    if (formItem && formItem.rules) {
        return [...formItem.rules, ...commonRules]
    } else {
        return commonRules
    }
}

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