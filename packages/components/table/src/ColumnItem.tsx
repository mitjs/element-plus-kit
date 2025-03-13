import { defineComponent, renderSlot, type PropType } from "vue";
import type { DefaultProps, HeaderProps, TableColums } from "./types";
import { ElTableColumn } from "element-plus";
import { has, isFunction } from "lodash-es";

export default defineComponent({
    name: 'ColumnItem',
    props: {
        column: {
            type: Object as PropType<TableColums>,
            required: true,
            default: () => { },
        },
        tslots: {
            type: Object as PropType<any>,
            default: () => ({}),
        }
    },
    setup(props) {
        const { column: { prop, label, render, ...moreCol }, tslots } = props

        return () => {
            return <ElTableColumn prop={prop} show-overflow-tooltip {...moreCol}
                v-slots={{
                    header: (scope: HeaderProps) => {
                        if (has(tslots, `${prop}.header`)) return renderSlot(tslots, `${prop}.header`, scope)
                        if (label && isFunction(label)) return label(scope)
                        return label
                    },
                    default: (scope: DefaultProps) => {
                        if (has(tslots, `${prop}`)) return renderSlot(tslots, `${prop}`, scope)
                        if (render && isFunction(render)) return render(scope)
                        return scope.row[prop!]
                    },

                }}>
            </ElTableColumn>
        }
    }
})