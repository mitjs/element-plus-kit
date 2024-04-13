import {
  defineComponent,
  ref,
  toRefs,
  provide,
  PropType,
  watch,
  inject,
  defineExpose,
  onMounted,
} from "vue";
import QtHeader from "./qt-header";
import QtPagnation from "./qt-pagination";
import QtTable from "./qt-table";
import type { ColumnProps, IPageProps } from "./types";
export default defineComponent({
  props: {
    title: String,
    data: {
      type: Array,
      required: true,
      default: () => [],
    },
    columns: {
      type: Array as PropType<ColumnProps[]>,
      required: true,
      default: () => [],
    },
    page: {
      type: Object as PropType<IPageProps>,
    },
    pageConfig: {
      type: Object,
      default: () => ({
        background: true,
        layout: "total, sizes, prev, pager, next, jumper",
      }),
    },
    total: Number,
  },
  emits: ["update:page", "page-change"],
  setup(props, { attrs, slots, emit, expose }) {
    const pageChange = (page: any, type: string) => {
      emit("page-change", page, type);
    };

    const quickTableRef = ref();
    // setTimeout(() => {
    //   console.log('',quickTableRef);
    // }, 1e3);
    onMounted(() => {
      console.log("22222", quickTableRef);
    });
    expose({ ...quickTableRef.value });
    // defineExpose({ ...quickTableRef });
    return {
      quickTableRef,
      ...toRefs(props),
      attrs,
      slots,
      pageChange,
    };
  },
  render() {
    //
    const {
      quickTableRef,
      title,
      data,
      attrs,
      columns,
      page,
      pageConfig,
      total,
      slots: { header, headerLeft, headerRight, pagaination, ...tableSlots },
      pageChange,
    } = this;

    return (
      <>
        <QtHeader title={title} v-slots={{ header, headerLeft, headerRight }} />
        <QtTable
          ref="quickTableRef"
          data={data}
          {...attrs}
          columns={columns}
          v-slots={tableSlots}
        />
        {pagaination || page ? (
          <QtPagnation
            v-model:page={page}
            total={total}
            {...pageConfig}
            onPage-change={pageChange}
            v-slots={pagaination}
          />
        ) : null}
      </>
    );
  },
});
