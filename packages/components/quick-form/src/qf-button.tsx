import { defineComponent, effect, inject, shallowRef, ref, toRefs, PropType } from "vue";
import type { BtnTypeLabel, BtnTypeObj, } from './types'
import { btnsRow, BtnsIconRow } from './constants'

export default defineComponent({
    props: {
        buttons: {
            type: Array as PropType<Array<BtnTypeLabel>>,
            required: false,
            default: () => [],
        },
    },
    setup(props) {
        const { buttons } = toRefs(props)
        const { validate, btnEvent }: Record<string, any> = inject('formObserver') as any


        /* 按钮事件 */
        const onEvent = (item: BtnTypeLabel) => {
            console.log(item);

            btnEvent(item.type)
        }
        return {
            ...toRefs(props), onEvent
        }
    },
    render() {
        const { buttons, onEvent } = this;
        console.log(buttons);

        return <>
            {buttons.map((item: BtnTypeLabel) => {
                return <el-button type="primary" icon={item.icon ? item.icon : null} plain={!['search', 'submit'].includes(item.type)} onClick={() => onEvent(item)}>{item.label}</el-button>
            })}
        </>
    }
})