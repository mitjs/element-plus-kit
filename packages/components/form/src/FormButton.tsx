import { defineComponent, inject, type PropType } from "vue";
import type { BtnType, BtnTypeUnit, FormProvideProps } from "./types";
import { ElButton } from "element-plus";
import { isString } from "lodash-es";
import { buttonTextMap, defaultButtonsMap } from "./constants";

export default defineComponent({
    name: "form-button",
    props: {
        buttons: {
            type: Array as PropType<Array<BtnTypeUnit>>,
            default: () => []
        }
    },
    setup(props,) {
        const { buttons } = props
        const { events } = inject('formContext') as FormProvideProps
        const initButtons = () => {
            return buttons.map(item => {
                if (isString(item)) {
                    return {
                        type: item,
                        ...buttonTextMap[item]
                    }
                }
                return {
                    ...item,
                    plain: ['cancel', 'reset'].includes(item.type),
                }
            })
        }
        /* 按钮事件 */
        const onEvent = (type: BtnType) => {
            events(type)
        }

        return () => (
            <>
                {
                    initButtons().map(item => {
                        if (!defaultButtonsMap.includes(item.type)) {
                            return new Error(`The button type ${item} is not supported`)
                        }
                        return <ElButton key={item.type} type='primary' plain={item.plain} icon={item.icon} onClick={() => onEvent(item.type)}>{item.label}</ElButton>
                    })
                }
            </>
        )
    }
})