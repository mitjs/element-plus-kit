import { defineComponent, toRefs, renderSlot, inject } from "vue";

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
        const { slots: { theader, headerLeft, headerRight }, slots, title } = this
        // console.log('header slots---------', slots);

        const renderHeader = () => {
            return <div class='quick-table-header'>
                <div class={{ 'qt-left-title': !!title }}>{headerLeft ? renderSlot(slots, 'headerLeft') : title}</div>
                <div>{headerRight ? renderSlot(slots, 'headerRight') : null}</div>
            </div>
        }

        return <>
            {theader ? renderSlot(slots, 'theader') : headerLeft || headerRight ? renderHeader() : null}
        </>
    }
})