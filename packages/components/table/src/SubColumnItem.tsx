import { defineComponent, type PropType } from "vue";
import type { TableColums } from "./types";
import { ElTableColumn } from "element-plus";
import { has, isArray } from "lodash-es";
import SubColumnItem from './SubColumnItem'
import ColumnItem from './ColumnItem'
export default defineComponent({
    name: 'SubColumnItem',
    props: {
        column: {
            type: Object as PropType<Omit<TableColums, 'children'>>,
            required: true,
            default: () => ({}),
        },
        children: {
            type: Array as PropType<Partial<TableColums>[]>,
            default: () => ([]),
        },
        tslots: {
            type: Object as PropType<any>,
            default: () => ({}),
        }
    },
    setup(props) {
        const { column, children, tslots } = props
        return () => (
            <ElTableColumn {...column}>
                {
                    children.map((col: TableColums) => {
                        if (has(col, 'children')) {
                            if (!isArray(col.children)) {
                                new Error('children must be an array')
                                return null
                            }
                            const { children: subChildren, ...moreCols } = col
                            return <SubColumnItem key={col.prop} column={moreCols} children={subChildren} tslots={tslots} />
                        }
                        return <ColumnItem key={col.prop} column={col} tslots={tslots} />
                    })
                }
            </ElTableColumn>
        )
    }
})