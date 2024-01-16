import { defineComponent, toRefs, provide } from "vue";
import QtHeader from "./qt-header";
import QtPagnation from "./qt-pagination";
import QtTable from "./qt-table";
export default defineComponent({
  props: {
    title: String,
    data: {
      type: Array,
      required: true,
      default: () => [],
    },
    columns: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  setup(props, { slots }) {
    // console.log(slots);

    const pageChange = (page: any, type: string) => {
      console.log(page, type);
    };
    return {
      ...toRefs(props),
      slots,
      pageChange,
    };
  },
  render() {
    //
    const {
      title,
      data,
      columns,
      slots: { header, headerLeft, headerRight, pagaination, ...tableSlots },
      pageChange,
    } = this;
    // slots={header, headerLeft, headerRight}
    return (
      <>
        <QtHeader title={title} v-slots={{ header, headerLeft, headerRight }} />
        <QtTable data={data} columns={columns} v-slots={tableSlots} />
        <QtPagnation pageChange={pageChange} v-slots={pagaination} />
      </>
    );
  },
});
