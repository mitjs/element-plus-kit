import { defineComponent, toRefs, PropType } from "vue";
import type { ColumnProps } from '../types'
import ColumnItem from './column-item'
export default defineComponent({
    props: {
        column: {
            type: Object as PropType<ColumnProps>,
            required: true,
            default: () => { }
        }
    },
    setup(props) {

        return {
            ...toRefs(props)
        }
    },
    render() {
        const { column } = this
        return <>
            <el-table-column label={column.label}>
                {
                    // column.children((col: ColumnProps) => {

                    // })
                }
            </el-table-column>
        </>
    }
})