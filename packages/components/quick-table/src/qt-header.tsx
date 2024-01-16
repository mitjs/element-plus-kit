import { defineComponent, toRefs, renderSlot, inject } from "vue";
import './index.scss'
export default defineComponent({
    name: "Header",
    props: {
        title: String
    },
    setup(props, { slots }) {
        // console.log('header', slots);

        return {
            ...toRefs(props),
            slots
        }
    },
    render() {
        const { slots: { header, headerLeft, headerRight }, slots, title } = this
        const renderHeader = () => {
            return <>
                <div>{headerLeft ? renderSlot(slots, 'headerLeft') : title}</div>
                <div>{headerRight ? renderSlot(slots, 'headerRight') : null}</div>
            </>
        }

        return <div class='quick-table-header'>
            {header ? renderSlot(slots, 'header') : headerLeft || headerRight ? renderHeader() : null}
        </div>
    }
})