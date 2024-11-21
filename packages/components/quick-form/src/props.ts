import type { PropType } from "vue";
import type {
  CompTypes,
  ItemRowProps,
  IOptionRow,
  Arrayable,
  BtnType,
  BtnTypeObj,
} from "./types";

/**
 * form 组件 props参数
 */
export const QFromProps = {
  model: {
    type: Object,
    required: true,
    default: () => { },
  },
  formOptions: {
    type: Array as PropType<Array<ItemRowProps>>,
    required: true,
    default: () => [],
  },
  rules: {
    type: Object,
    required: false,
    default: () => { },
  },
  required: {
    type: Boolean,
    required: false,
  },
  gutter: {
    type: Number,
    required: false,
  },
  col: {
    type: Number,
    required: false,
  },
  buttons: {
    type: Array as PropType<Array<BtnTypeObj>>,
    required: false,
    default: () => [],
  },
};

/**
 * form-item 组件 props参数
 */
export const QFItemProps = {
  formValue: {
    type: Object,
    default: () => { },
  },
  formOptions: {
    type: Object as PropType<Array<ItemRowProps>>,
    required: false,
    default: () => [],
  },
  required: Boolean,
  isGrid: Boolean,
  globalCol: Number,
  buttons: {
    type: Array as PropType<Array<BtnTypeObj>>,
    required: false,
    default: () => [],
  },
};

/**
 * component 组件 props参数
 */
export const QFComponentProps = {
  // 组件类型
  label: String,
  type: {
    type: String as PropType<CompTypes>,
    required: true,
    default: "input",
  },
  prop: {
    required: true,
    type: String
  },
  formValue: {
    type: Object,
    default: () => { },
  },
  options: {
    type: Array as PropType<Array<IOptionRow>>,
    required: false,
    default: () => [],
  },
  orgAttrs: {
    type: Object,
    default: () => { },
  },
};
