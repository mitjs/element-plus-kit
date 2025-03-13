import type { CascaderProps, CheckboxProps, ColorPickerProps, DatePickerProps, ElSelect, ElSelectV2, ElTimeSelect, ElTreeSelect, FormItemProps, InputNumberProps, InputProps, RadioProps, RateProps, SliderProps, SwitchProps, TimePickerDefaultProps, } from "element-plus";
import type { VNode } from "vue";
export type CompTypes = "input" | 'textarea' | "input-number" | "select" | "select-v2" | "cascader" | "radio" | "checkbox" | "tree-select" | "time-select" | "date-picker" | "time-picker" | "color-picker" | "rate" | "slider" | "switch" | "text" | "html" | "slot";

export type ItemOptions = {
    label: string;
    value: Numeric;
    children?: Array<ItemOptions>;
} & Indexable

type SlotEventNode = (...args: any) => VNode
export type CompPropsMap = {
    input: InputProps & { slots?: { prefix?: SlotEventNode, suffix?: SlotEventNode, prepend?: SlotEventNode, append?: SlotEventNode } },
    textarea: InputProps & { slots: { 'decrease-icon'?: SlotEventNode, 'increase-icon'?: SlotEventNode, prefix?: SlotEventNode, suffix?: SlotEventNode } },
    inputNumber: InputNumberProps,
    select: InstanceType<typeof ElSelect> & { slots?: { header?: SlotEventNode, footer?: SlotEventNode, prefix?: SlotEventNode, empty?: SlotEventNode, tag?: SlotEventNode, loading?: SlotEventNode, label?: SlotEventNode } },
    selectV2: InstanceType<typeof ElSelectV2> & { slots?: { header?: SlotEventNode, footer?: SlotEventNode, prefix?: SlotEventNode, empty?: SlotEventNode, tag?: SlotEventNode, loading?: SlotEventNode, label?: SlotEventNode }, }
    cascader: CascaderProps
    radio: RadioProps
    checkbox: CheckboxProps
    'tree-select': InstanceType<typeof ElTreeSelect>
    'time-select': InstanceType<typeof ElTimeSelect>
    'time-picker': TimePickerDefaultProps
    'date-picker': DatePickerProps & {
        slots?: {
            'range-separator': SlotEventNode,
            'prev-month': SlotEventNode,
            'next-month': SlotEventNode,
            'prev-year': SlotEventNode,
            'next-year': SlotEventNode,
        }
    }
    'color-picker': ColorPickerProps
    rate: RateProps
    slider: SliderProps
    switch: SwitchProps & { slots?: { 'active-action'?: SlotEventNode, 'inactive-action'?: SlotEventNode } },
    text: Indexable,
    html: Indexable
    slot: Indexable
}

export type FormItemRows<T extends CompTypes = CompTypes> = {
    type: T;
    label: string | (() => VNode);
    prop: string;
    col?: number;
    required?: boolean | ((formValue: Indexable) => boolean);
    options?: Array<ItemOptions>;
    formItem?: Partial<FormItemProps> & Indexable;
    attrs?: (T extends keyof CompPropsMap ? CompPropsMap[T] : Indexable); //原始 CompTypes 组件属性及方法
    vIf?: boolean | ((formValue: Indexable) => boolean);
}

export type BtnType = "search" | "reset" | "cancel" | "submit";
export type BtnTypeRow = {
    label: string;
    type: BtnType;
    icon?: string;
}
export type BtnTypeUnit = BtnTypeRow | BtnType;


export type ProvideEventNames = "change" | "input" | 'clear' | 'blur' | 'focus' | "search" | "reset" | "cancel" | "submit" | 'expand-change' | 'visible-change' | 'remove-tag' | 'active-change';
export type FormProvideProps = {
    formSlots: Indexable
    rules?: Indexable
    events: (e: ProvideEventNames, ...args: any[]) => void
}

