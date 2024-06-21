import type {
  formItemProps,
  InputProps,
  InputNumberProps,
  DatePickerProps,
} from "element-plus";
import { VNode } from "vue";

export type Numric = string | number;
export type CompTypes =
  | "input"
  | 'textarea'
  | "input-number"
  | "select"
  | "select-v2"
  | "cascader"
  | "radio"
  | "checkbox"
  | "time-select"
  | "date-picker"
  | "time-picker"
  | "color-picker"
  | "rate"
  | "slider"
  | "switch"
  | "text"
  | "slot";


export type RenderComp<T = any> = {
  [C in CompTypes]?: () => JSX.Element | T;
};

/**
 * options options类型声明
 */
export interface IOptionRow {
  label: string;
  value: Numric;
}

export interface ItemRowProps {
  type: CompTypes;
  label: () => VNode | string;
  prop: string;
  col?: number;
  options: Array<IOptionRow>;
  formItem?: formItemProps;
  attrs?: any; //原始 CompTypes 组件属性及方法
}



/**
 * 按钮组类型声明
 */
export type BtnType = "search" | "reset" | "cancel" | "submit";
export interface BtnTypeLabel {
  label: string;
  type: BtnType;
  icon?: string;
}
export type BtnTypeObj = BtnTypeLabel | BtnType;
export type Arrayable<T> = T | T[];

// 日期类型格式
export type DatePickerType =
  | "date"
  | "dates"
  | "year"
  | "month"
  | "week"
  | "datetime"
  | "daterange"
  | "monthrange"
  | "datetimerange";
