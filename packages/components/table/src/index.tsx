import { defineComponent, renderSlot, ref, type ExtractPropTypes, type PropType } from "vue";
import { createNamespace } from '@elementplus-kit/utils'
import defaultProps from "element-plus/es/components/table/src/table/defaults";
import { ElConfigProvider, ElTable, type TableInstance } from "element-plus";
import { zhCn } from "element-plus/es/locale/index.mjs";
import { has, isArray, isEmpty, } from "lodash-es";
import Pagniation, { type QPaginationProps } from "./Pagniation";
import THeader from "./THeader"
import type { TableColums } from "./types";
import SubColumnItem from "./SubColumnItem";
import ColumnItem from "./ColumnItem";
const [name] = createNamespace('table')
const tableProps = Object.assign({}, defaultProps, {
    title: String,
    data: {
        type: Array,
        required: true,
        default: () => [],
    },
    page: {
        type: Object as PropType<Partial<QPaginationProps>>,
        default: () => ({})
    },
    columns: {
        type: Array as PropType<TableColums[]>,
        default: () => []
    },
})
export type QTableProps = ExtractPropTypes<typeof tableProps>
export default defineComponent({
    name,
    props: tableProps,
    emits: ['page-change', 'current-change', 'size-change'],
    setup(props, { slots, emit, attrs, expose }) {
        const { title, data, columns, page, ...moreProps } = props
        const tableRef = ref<TableInstance | null>()
        const { headerLeft, headerRight, append, empty, ...moreSlots } = slots

        const onPageChange = (...args: any) => emit('page-change', ...args)
        const onCurrentChange = (...args: any) => emit('current-change', ...args)
        const onSizeChange = (...args: any) => emit('size-change', ...args)

        expose({
            setCurrentRow: (row: any) => tableRef.value?.setCurrentRow(row),
            getSelectionRows: () => tableRef.value?.getSelectionRows(),
            toggleRowSelection: (row: any, selected: boolean) => tableRef.value?.toggleRowSelection(row, selected),
            clearSelection: () => tableRef.value?.clearSelection,
            clearFilter: (columnKeys?: string[] | undefined) => tableRef.value?.clearFilter(columnKeys),
            toggleAllSelection: () => tableRef.value?.toggleAllSelection(),
            toggleRowExpansion: (row: any, expanded?: boolean | undefined) => tableRef.value?.toggleRowExpansion(row, expanded),
            clearSort: () => tableRef.value?.clearSort(),
            doLayout: () => tableRef.value?.doLayout(),
            sort: (prop: string, order: string) => tableRef.value?.sort(prop, order),
        })

        return () => (
            <ElConfigProvider locale={zhCn}>
                {has(slots, 'theader') ? renderSlot(slots, 'theader') : <THeader title={title} v-slots={{ headerLeft, headerRight }} />}
                <ElTable ref="tableRef" data={data} {...moreProps} {...attrs} v-slots={{ append, empty }}>
                    {
                        columns.map((item: TableColums) => {

                            if (has(item, 'children')) {
                                if (!isArray(item.children)) {
                                    new Error('children must be an array')
                                    return null
                                }
                                const { children, ...moreCols } = item
                                return <SubColumnItem key={item.prop} column={moreCols} children={children} tslots={moreSlots} />
                            }

                            return <ColumnItem key={item.prop} column={item} tslots={moreSlots} />

                        })
                    }
                </ElTable>
                {has(slots, 'tfooter') ? renderSlot(slots, 'tfooter') : has(props, 'page') && !isEmpty(props.page) ? <Pagniation page={page} onPage-change={onPageChange} onCurrent-change={onCurrentChange} onSize-change={onSizeChange} /> : <></>}
            </ElConfigProvider>
        )
    }
})