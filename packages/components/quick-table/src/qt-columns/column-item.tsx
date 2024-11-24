import { defineComponent, toRefs, PropType, inject, renderSlot } from "vue";
import type { ColumnProps } from "../types";

export default defineComponent({
  props: {
    column: {
      type: Object as PropType<ColumnProps>,
      required: true,
      default: () => { },
    },
  },
  setup(props) {
    const { colSlots }: Record<string, any> = inject("TableObserver") as any;
    // console.log("columns", props.column.slot, TableSlots);
    return {
      ...toRefs(props),
      colSlots,
    };
  },
  render() {
    const {
      column: { prop, slot, ...property },
      colSlots,
    } = this;

    console.log("colSlots--------------------", colSlots,);


    return (
      <>
        {/* {
                columns.map((col: ColumnProps) => {
                    if(col.children&&Array.isArray(col.children){

                    }
                    return <el-table-column {...col} />
                })
            } */}
        {/* <el-table-column prop="date" label="Date" width="150" /> */}
        <el-table-column prop={prop} {...property} v-slots={slot}>
          {Object.keys(colSlots).includes(prop)
            ? renderSlot(colSlots, 'default')
            : null}
        </el-table-column>
      </>
    );
  },
});
