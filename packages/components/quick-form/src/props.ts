import type { PropType } from "vue";
import type {
  CompTypes,
  ItemRowProps,
  IOptionRow,
  Arrayable,
  BtnType,
  BtnTypeObj,
} from "../types";

/**
 * form 组件 props参数
 */
export const QFromProps = {
  model: {
    type: Object,
    required: true,
    default: () => {},
  },
  rules: {
    type: Object,
    required: false,
    default: () => {},
  },
  required: Boolean,
  gutter: Number,
  col: Number,
  formOptions: {
    type: Array as PropType<Array<ItemRowProps>>,
    required: true,
    default: () => [],
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
    default: () => {},
  },
  formOptions: {
    type: Object as PropType<Array<ItemRowProps>>,
    required: false,
    default: () => [],
  },
  required: Boolean,
  isLayout: Boolean,
  globalCol: Number,
};

/**
 * component 组件 props参数
 */
export const QFComponentProps = {
  // 组件类型
  label: String,
  type: {
    type: String as PropType<CompTypes>,
    default: "input",
  },
  prop: String,
  formValue: {
    type: Object,
    default: () => {},
  },
  options: {
    type: Array as PropType<Array<IOptionRow>>,
    required: false,
    default: () => [],
  },
  component: {
    type: Object,
    default: () => {},
  },
};
