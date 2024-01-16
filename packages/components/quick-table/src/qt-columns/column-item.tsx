import { defineComponent, toRefs, PropType, inject } from "vue";
import type { ColumnProps } from '../types'

export default defineComponent({
    props: {
        column: {
            type: Object as PropType<ColumnProps>,
            required: true,
            default: () => { }
        }
    },
    setup(props) {
        const { TableSlots }: Record<string, any> = inject('TableObserver') as any
        // console.log('columns', TableSlots);
        return {
            ...toRefs(props), TableSlots
        }
    },
    render() {
        const { column: { prop, ...property }, TableSlots } = this

        return <>
            {/* {
                columns.map((col: ColumnProps) => {
                    if(col.children&&Array.isArray(col.children){

                    }
                    return <el-table-column {...col} />
                })
            } */}
            {/* <el-table-column prop="date" label="Date" width="150" /> */}
            <el-table-column prop={prop} {...property}>

            </el-table-column  >
        </>
    }
})