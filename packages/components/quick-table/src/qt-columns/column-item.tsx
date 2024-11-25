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
    return (
      <>
        <el-table-column prop={prop} label={label} {...property}
          v-slots={{
            header: (scope: any) => {
              if (has(colSlots, `${prop}.header`)) return renderSlot(colSlots, `${prop}.header`, scope)

              if (slot && has(slot, 'header')) return (slot as any).header(scope)
              return label

            },
            default: (scope: any) => {
              if (has(colSlots, `${prop}`)) return renderSlot(colSlots, `${prop}`, scope)
              if (slot && has(slot, 'default')) return (slot as any).default(scope)
              return scope.row[prop]
            }
          }}>
        </el-table-column>
      </>
    );
  },
});
