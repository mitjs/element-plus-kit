import type { formItemProps, InputProps, InputNumberProps } from "element-plus";

export type CompTypes =
  | "input"
  | "input-number"
  | "select"
  | "select-v2"
  | "time-select"
  | "radio"
  | "checkbox"
  | "date-picker"
  | "time-picker"
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

export type ItemLabel = string;

export interface ItemRowProps {
  type: CompTypes;
  label: ItemLabel;
  prop: string;
  col?: number;
  options: Array<IOptionRow>;
  formItem?: formItemProps;
  component?: any;
}

/**
 * options options类型声明
 */
export interface IOptionRow {
  label: string;
  value: string | number;
}

/**
 * 按钮组类型声明
 */
export type BtnType = "search" | "reset" | "cancel" | "submit";
export interface BtnTypeRow {
  label: string;
  type: BtnType;
  icon?: string;
}
export type BtnTypeObj = BtnTypeLabel | BtnType;
export type Arrayable<T> = T | T[];
