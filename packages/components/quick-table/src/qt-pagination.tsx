import {
  defineComponent,
  ref,
  toRefs,
  inject,
  renderSlot,
  PropType,
} from "vue";

export default defineComponent({
  props: {
    page: {
      type: Object,
      default: () => ({
        "current-page": 1,
        "page-szie": 10,
      }),
    },
  },
  emits: {},
  setup(props, { attrs, emit, slots }) {
    // console.log('pagination', slots);
    const { pageChange } = attrs;
    const page = ref({
      currentPage: 1,
      pageSize: 10,
    });

    const sizeChange = (pageSize: number) => {
      console.log("size", pageSize);
      // pageChange({currentPage:page.value.currentPage, pageSize,} "size")
      //   emit('pageChange',{currentPage:page.value.currentPage, pageSize,} "size")
    };
    const currentChange = (currentPage: number) => {
      console.log("current", currentPage);
      // pageChange({currentPage:currentPage, pageSize:page.value.pageSize} "current")
      //   emit('pageChange',{currentPage:currentPage, pageSize:page.value.pageSize} "current")
    };

    /* 渲染分页组件 */
    const renderPagination = () => (
      <div>
        <el-pagination
          v-model:current-page={page.value.currentPage}
          v-model:pageSize={page.value.pageSize}
          layout="prev, pager,sizes, next"
          total={50}
          onCurrent-Change={currentChange}
          onSize-change={sizeChange}
        />
      </div>
    );

    return {
      // ...toRefs(props),
      page,
      slots,
      renderPagination,
    };
  },
  render() {
    const {
      slots: { pagaination },
      page: { currentPage, pageSize },
      renderPagination,
    } = this;

    return (
      <>
        {pagaination
          ? renderSlot(this.slots, "pagaination")
          : renderPagination()}
      </>
    );
  },
});
