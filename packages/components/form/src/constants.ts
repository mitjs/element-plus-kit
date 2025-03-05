import type { BtnType, CompTypes, ProvideEventNames } from "./types"
import {
    Search,
    Refresh,
    CircleClose,
    CircleCheck,
} from "@element-plus/icons-vue";
export const InputEventAblity: CompTypes[] = ['input', 'textarea', 'select', 'select-v2', "slider"]
export const BlurWithFocusEventAblity: CompTypes[] = ['input', 'textarea', 'input-number', 'select', 'select-v2', "time-select", "time-picker", 'date-picker', "color-picker"]
export const ClearEventAblity: CompTypes[] = ['input', 'textarea', 'select', 'select-v2']

export const compEventMap: { [key in CompTypes]?: ProvideEventNames[] } = {
    'radio': ['change'],
    'checkbox': ['change'],
    'cascader': ['change', 'expand-change', 'clear', 'visible-change', 'remove-tag', 'blur', 'focus'],
    'input': ['change', 'input', 'clear', 'blur', 'focus'],
    'input-number': ['change', 'blur', 'focus'],
    'textarea': ['change', 'input', 'clear', 'blur', 'focus'],
    'select': ['change', 'visible-change', 'remove-tag', 'clear', 'blur', 'focus'],
    'select-v2': ['change', 'visible-change', 'remove-tag', 'clear', 'blur', 'focus'],
    'slider': ['change', 'input'],
    'rate': ['change'],
    'switch': ['change'],
    'time-picker': ['change', 'visible-change', 'clear', 'blur', 'focus'],
    'time-select': ['change', 'clear', 'blur', 'focus'],
    'date-picker': ['change', 'clear', 'blur', 'focus'],
    'color-picker': ['change', 'active-change', 'blur', 'focus'],
    'tree-select': ['change', 'clear', 'blur', 'focus'],
}

export const compSlotsMap: { [key in CompTypes]?: string[] } = {
    'input': ['prefix', 'suffix', 'prepend', 'append'],
    'input-number': ['decrease-icon', 'increase-icon', 'prefix', 'suffix'],
    'select': ['header', 'footer', 'prefix', 'empty', 'tag', 'loading', 'label'],
    'select-v2': ['header', 'footer', 'prefix', 'empty', 'tag', 'loading', 'label'],
    'switch': ['active-action', 'inactive-action'],
    'date-picker': ['range-separator', 'prev-month', 'next-month', 'prev-year', 'next-year']
}

export const defaultButtonsMap: BtnType[] = ['cancel', 'submit', 'reset', 'search']
export const buttonTextMap: { [k in BtnType]: { label: string, icon: any, plain: boolean } } = {

    'submit': {
        label: '提交',
        icon: CircleCheck,
        plain: false
    },
    'search': {
        label: '搜索',
        icon: Search,
        plain: false
    },
    'cancel': {
        label: '取消',
        icon: CircleClose,
        plain: true
    },
    'reset': {
        label: '重置',
        icon: Refresh,
        plain: false
    },

}