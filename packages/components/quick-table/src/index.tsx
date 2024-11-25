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
  computed,
  ComputedRef,
  WritableComputedRef,
  effect,
} from "vue";
import { ElConfigProvider,} from "element-plus";
import zhCn from "element-plus/es/locale/lang/zh-cn";
import QtHeader from "./qt-header";
import QtPagnation from "./qt-pagination";
import QtTable from "./qt-table";
import type { ColumnProps, IPageProps } from "./types";
import '../style/index.scss'
import { has } from "lodash-es";

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
      type: Object as PropType<any>,
      default: () => ({}),
    },
    total: Number,
  },
  emits: ["update:page", "page-change"],
  setup(props, { attrs, slots, emit, expose }) {
    const pageChange = (page: any, type: string) => {
      emit("page-change", page, type);
    };

    const newCols= computed(()=>{
      if(props.columns.some((item:any)=>item.prop==='action')) return props.columns
      if(has(slots,'action')) return props.columns.concat([{ label: "操作", prop: "action",minWidth:150 }])
      return props.columns
    })

    const quickTableRef = ref();
 
    onMounted(() => {
    });

    expose({ ...quickTableRef.value });

    return {
      quickTableRef,
      newCols,
      ...toRefs(props),
      attrs,
      slots,
      pageChange,
    };
  },
  render() {
    const {
      quickTableRef,
      title,
      data,
      attrs,
      columns,
      page,
      pageConfig,
      total,
      slots,
      newCols,
      slots: { theader, headerLeft, headerRight, tfooter, ...tableSlots },
      pageChange,
    } = this;
      
    return (
      <>
        <ElConfigProvider locale={zhCn}>
        <QtHeader title={title} v-slots={{ theader, headerLeft, headerRight }} />
        <QtTable
          ref="quickTableRef"
          data={data}
          {...attrs}
          columns={newCols}
          v-slots={tableSlots}
        />
        {has(slots,'tfooter') || page ? (
          <QtPagnation
            v-model:page={page}
            {...pageConfig}
            onPage-change={pageChange}
            v-slots={{tfooter}}
          />
        ) : null}
        </ElConfigProvider>
       
      </>
    );
  },
});
