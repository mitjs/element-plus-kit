import { defineComponent, toRefs } from "vue";
import QtHeader from "./qt-header";
import QtPagnation from "./qt-pagination";
import QtTable from "./qt-table";
export default defineComponent({
    props: {
        data: {
            type: Array,
            required: true,
            default: () => []
        },
        columns: {
            type: Array,
            required: true,
            default: () => []
        }
    },
    setup(props) {

        return {
            ...toRefs(props)
        }
    },
    render() {
        const { data, columns } = this
        return <>
            <QtHeader />
            <QtTable data={data} columns={columns} />
            <QtPagnation />
        </>
    }
})