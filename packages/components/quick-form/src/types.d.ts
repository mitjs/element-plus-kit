import type {
  formItemProps,
  InputProps,
  InputNumberProps,
  DatePickerProps,
} from "element-plus";
import { VNode } from "vue";

export type Numric = string | number;
export type CompTypes = "input" | 'textarea' | "input-number" | "select" | "select-v2" | "cascader" | "radio" | "checkbox" | "tree-select" | "time-select" | "date-picker" | "time-picker" | "color-picker" | "rate" | "slider" | "switch" | "text" | "html" | "slot";


export type RenderComp<T = any> = {
  [C in CompTypes]?: () => JSX.Element | T;
};

/**
 * options options类型声明
 */
export type IOptionRow = {
  label: string;
  value: Numric;
  children?: Array<IOptionRow>;
} & Indexable

export type ItemRowProps = {
  type: CompTypes;
  label: string | (() => VNode);
  prop: string;
  col?: number;
  required?: boolean | (() => boolean);
  options?: Array<IOptionRow>;
  formItem?: formItemProps;
  attrs?: any; //原始 CompTypes 组件属性及方法
  vIf?: boolean | ((formValue: Indexable) => boolean);
}

/**
 * 按钮组类型声明
 */
export type BtnType = "search" | "reset" | "cancel" | "submit";
export type BtnTypeRow = {
  label: string;
  type: BtnType;
  icon?: string;
}
export type BtnTypeObj = BtnTypeRow | BtnType;
export type Arrayable<T> = T | T[];

// 日期类型格式
export type DatePickerType = "date" | "dates" | "year" | "month" | "week" | "datetime" | "daterange" | "monthrange" | "datetimerange";
