import type {
  formItemProps,
  InputProps,
  InputNumberProps,
  DatePickerProps,
} from "element-plus";
import { VNode } from "vue";

export type CompTypes =
  | "input"
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

// export type CompInstance<T> = {
//   [K in CompTypes]: InstanceType<typeof T>;
// };

export type RenderComp<T = any> = {
  [C in CompTypes]?: () => JSX.Element | T;
};

// export type ItemLabel = string | ()=>VNode;
/**
 * options options类型声明
 */
export interface IOptionRow {
  label: string;
  value: string | number;
}

export interface ItemRowProps {
  type: CompTypes;
  label: () => VNode | string;
  prop: string;
  col?: number;
  options: Array<IOptionRow>;
  formItem?: formItemProps;
  component?: any;
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
