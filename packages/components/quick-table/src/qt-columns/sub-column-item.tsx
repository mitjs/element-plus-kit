import { defineComponent, toRefs, PropType } from "vue";
import type { ColumnProps } from '../types'
import ColumnItem from './column-item'
import SubColumnItem from './sub-column-item'
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
        const { column: { children, ...propertys } } = this
        return <>
            <el-table-column  {...propertys}>
                {
                    children.map((col: ColumnProps) => {
                        if (col.children && Array.isArray(col.children) && col.children.length) {
                            return <SubColumnItem column={col}></SubColumnItem>
                        } else {
                            // console.log(col);
                            return <ColumnItem column={col}> </ColumnItem>
                        }
                    })
                }
            </el-table-column>
        </>
    }
})