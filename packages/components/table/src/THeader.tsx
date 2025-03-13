import { has } from "lodash-es";
import { defineComponent, renderSlot } from "vue";

export default defineComponent({
    props: {
        title: String,
    },
    setup(props, { slots }) {
        const { title } = props
        return () => (
            <div class='quick-table-header' >
                <div class={{ 'qt-left-title': !!title }} >{has(slots, 'headerLeft') ? renderSlot(slots, 'headerLeft') : title}</div>
                <div>{has(slots, 'headerRight') ? renderSlot(slots, 'headerRight') : null}</div>
            </div>
        )
    }
})