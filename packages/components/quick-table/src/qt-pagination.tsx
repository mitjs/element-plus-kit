import {
  defineComponent,
  ref,
  toRefs,
  inject,
  renderSlot,
  PropType,
  computed,
} from "vue";
import type { IPageProps } from "./types";
import { has } from "lodash-es";

export default defineComponent({
  props: {
    page: {
      type: Object as PropType<IPageProps>,
      default: () => ({ current: 1, size: 10 }),
    },
    total: Number,
  },
  emits: ["update:page", "page-change"],
  setup(props, { attrs, emit, slots }) {
    const page = computed({
      get: () => props.page,
      set: (val) => emit("update:page", val),
    });

    const sizeChange = (pageSize: number) =>
      emit("page-change", page.value, "pageSize");
    const currentChange = (currentPage: number) =>
      emit("page-change", page.value, "currentPage");

    /* 渲染分页组件 */
    const renderPagination = () => (
      <el-pagination
        v-model:current-page={page.value.current}
        v-model:pageSize={page.value.size}
        total={page.value.total}
        background
        {...attrs}
        onCurrent-change={currentChange}
        onSize-change={sizeChange}
      />
    );

   
    
    return {
      ...toRefs(props),
      slots,
      renderPagination,
    };
  },
  render() {
    const {
      total,
      slots,
      slots: { tfooter },
      renderPagination,
    } = this;
    // console.log('footer slots---------', slots);
    return (
      <>
      { tfooter? renderSlot(this.slots, "tfooter"): 
      <div class="quick-table-pagination">
          {renderPagination()}
      </div>}
      </>
     
    );
  },
});
