import { PropType, defineComponent, inject } from "vue";
import type { BtnType, BtnTypeObj } from './types'

const DefaultBtns: BtnType[] = ['search', 'reset', 'cancel', 'submit']

export default defineComponent({
    setup(props) {
        const { buttons = [], validate, btnEvent }: Record<string, any> = inject('formObserver') as any
        const btns: BtnType[] = DefaultBtns.filter(item => buttons.includes(item))

        const onEvent = (item: BtnTypeObj) => {
            console.log(item);
            // validate()
            btnEvent(item)
        }
        return {
            btns, onEvent
        }
    },
    render() {
        const { btns, onEvent } = this;

        return <>
            {btns.map(item => {
                return <el-button type="primary" onClick={() => onEvent(item)}>{item}</el-button>
            })}
        </>
    }
})