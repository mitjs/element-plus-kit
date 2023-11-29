import { defineComponent } from "vue";
import QtHeader from "./qt-header";
import QtPagnation from "./qt-pagination";
import QtTable from "./qt-table";
export default defineComponent({
    setup() {

    },
    render() {
        return <>
            <QtHeader />
            <QtTable />
            <QtPagnation />
        </>
    }
})