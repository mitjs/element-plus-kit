import { PropType, defineComponent, inject } from "vue";
import type { BtnTypeObj } from '../types'

const DefaultBtns = ['search', 'reset', 'cancel', 'submit']
export default defineComponent({

    setup(props) {
        const { buttons = [], validate }: Record<string, any> = inject('formObserver') as any
        const btns = DefaultBtns.filter(item => buttons.includes(item))
        console.log('buttons', buttons,);
        const onEvent = () => {
            console.log(111);
            validate()
        }
        return {
            btns, onEvent
        }
    },
    render() {
        const { btns, onEvent } = this;
        console.log(btns);

        return <>
            {btns.map(item => {
                return <el-button type="primary" onClick={onEvent}>{item}</el-button>
            })}
        </>
    }
})