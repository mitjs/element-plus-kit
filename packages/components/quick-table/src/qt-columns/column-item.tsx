import { defineComponent, toRefs, PropType, inject, renderSlot } from "vue";
import type { ColumnProps, ISlots } from "../types";
import { has } from "lodash-es";

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
      column: { prop, slot, label, ...property },
      colSlots,
    } = this;
    // console.log('--------------' + prop + '---------');

    // console.log("column--------------------", slot,);
    // console.log("colSlots--------------------", colSlots,);


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
        <el-table-column prop={prop} {...property}
          v-slots={{
            header: (scope: any) => {
              if (has(colSlots, `${prop}.header`)) return renderSlot(colSlots, `${prop}.header`, scope)

              if (slot && has(slot, 'header')) {
                if (prop == 'age') {
                  console.log('age slot ', slot, has(slot, 'header'));

                }
                return renderSlot(slot as any, 'header', scope)
              }
              return label

            },
            default: (scope: any) => {
              if (has(colSlots, `${prop}`)) return renderSlot(colSlots, `${prop}`, scope)
              if (slot && has(slot, 'default')) return renderSlot(slot as any, 'default', scope)
              return scope.row[prop]
            }
          }}>
          {/* {Object.keys(colSlots).includes(prop)
            ? renderSlot(colSlots, prop)
            : null} */}
        </el-table-column>
      </>
    );
  },
});
