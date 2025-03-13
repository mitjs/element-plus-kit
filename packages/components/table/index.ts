import { withInstall } from '@elementplus-kit/utils'
import Table, { type QTableProps } from './src/index'
import './style/index.scss'
export const QTable = withInstall(Table)
import type { TableColums } from './src/types'
import type { QPaginationProps } from './src/Pagniation'
export type { TableColums, QTableProps, QPaginationProps }