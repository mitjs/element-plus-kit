import { defineComponent, toRefs, PropType } from "vue";
import type { ColumnProps } from './types'
import { has } from "lodash-es";

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
            {/* {
                columns.map((col: ColumnProps) => {
                    if(col.children&&Array.isArray(col.children){

                    }
                    return <el-table-column {...col} />
                })
            } */}
            {/* <el-table-column prop="date" label="Date" width="150" /> */}
            <el-table-column label={column.label}>
                {
                    has(column, 'children') && Array.isArray(column.children) ? column.children.map((col: ColumnProps) => {
                        <el-table-column prop="state" label="State" width="120" />
                    }) : <></>
                }
            </el-table-column>
        </>
    }
})