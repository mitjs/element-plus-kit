import { defineComponent, toRefs, provide, PropType } from "vue";
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
    setup(props, { slots }) {

        // console.log('%C', slots);
        provide<{
            TableSlots: Record<string, any>;
        }>('TableObserver', {
            TableSlots: slots,
        })

        return {
            ...toRefs(props),
            slots
        }
    },
    render() {
        const { data, columns, slots } = this
        // console.log('slots========', slots);
        return <>
            <el-table data={data} >
                {
                    columns.map((col: ColumnProps) => {
                        if (col.children && Array.isArray(col.children) && col.children.length) return <QtSubColumnItem column={col}></QtSubColumnItem>
                        return <QtColumnItem column={col} ></QtColumnItem>
                    })
                }
            </el-table>
        </>
    }
})