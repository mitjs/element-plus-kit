import { defineComponent, effect, inject, shallowRef, ref, toRefs, PropType } from "vue";
import type { BtnTypeRow, BtnTypeObj, } from './types'
import { btnsRow, BtnsIconRow } from './constants'

export default defineComponent({
    props: {
        buttons: {
            type: Array as PropType<Array<BtnTypeRow>>,
            required: false,
            default: () => [],
        },
    },
    setup(props) {
        const { validate, btnEvent }: Record<string, any> = inject('formObserver') as any


        /* 按钮事件 */
        const onEvent = (item: BtnTypeRow) => {
            btnEvent(item.type)
        }
        return {
            ...toRefs(props), onEvent
        }
    },
    render() {
        const { buttons, onEvent } = this;
        return <>
            {buttons.map((item: BtnTypeRow) => {
                return <el-button type="primary" icon={item.icon ? item.icon : null} plain={!['search', 'submit'].includes(item.type)} onClick={() => onEvent(item)}>{item.label}</el-button>
            })}
        </>
    }
})