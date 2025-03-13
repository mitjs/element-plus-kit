import type { TableColumnCtx } from "element-plus";
import type { VNode } from "vue";

export type HeaderProps = { column: any, $index: number }
export type DefaultProps = { row: any, column: any, $index: number }
export type TableColums = {
    label?: string | ((scope: HeaderProps) => any),
    prop?: string,
    children?: (TableColums & Partial<TableColumnCtx<any>>)[],
    render?: (scope: DefaultProps) => VNode | Numeric
} & Partial<TableColumnCtx<any>>
