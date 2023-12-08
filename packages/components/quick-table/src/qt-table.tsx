import { defineComponent, toRefs, PropType } from "vue";
import type { ColumnProps } from './types'
import QtTableColumn from "./qt-table-column";
import QtColumnItem from './qt-columns/column-item'
import QtSubColumnItem from './qt-columns/sub-column-item'
export default defineComponent({
    props: {
        data: {
            type: Array,
            required: true,
            default: () => []
        },
        columns: {
            type: Array as PropType<Array<ColumnProps>>,
            required: true,
            default: () => []
        }
    },
    setup(props) {

        return {
            ...toRefs(props)
        }
    },
    render() {
        const { data, columns } = this
        return <>
            <el-table data="data" style="width: 100%">
                {
                    columns.map((col: ColumnProps) => {
                        if (col.children && Array.isArray(col.children)) {
                            return <QtSubColumnItem column={col}></QtSubColumnItem>
                        }
                        return <QtColumnItem column={col}></QtColumnItem>
                    })
                }
            </el-table>
        </>
    }
})