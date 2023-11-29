import { defineComponent, toRefs, inject, renderSlot, effect } from 'vue'
import QFormComponent from './qf-component'
import QFormButton from './qf-button'
import type { ItemRowProps, } from './types'
import { QFItemProps } from './props'

export default defineComponent({
    props: QFItemProps,
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

            return <el-form-item label={typeof label == 'string' ? label : null} prop={prop} {...formItem} v-slots={{
                label: typeof label == 'function' ? () => label() : null
            }}  >
                <QFormComponent label={typeof label == 'string' ? label : ''} type={type} prop={prop} formValue={formValue} options={options} component={component} />
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
