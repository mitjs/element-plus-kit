import { withInstall } from '@elementplus-kit/utils'
import Form, { type QFormProps } from './src/index'
import './style/index.scss'
import type { FormItemRows } from './src/types'
export const QForm = withInstall(Form)
export type { FormItemRows, QFormProps }