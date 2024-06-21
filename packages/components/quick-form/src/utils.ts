import type { CompTypes, ItemRowProps } from "./types";

/**
 * 查找第一个带Col的表单项
 * @param list
 * @returns
 */
export const findFirstHaveColFormItem = (list: ItemRowProps[]) => {
  const row = list.find((item) => item.col);
  return row ? row.col : 0;
};

/**
 * 处理默认placeholder内容
 * @param type  组件类型
 * @param label  formitem 项
 * @returns
 */
export const defaultPlaceholder = (type: CompTypes, label?: string) => {
  if (["input", 'textarea'].includes(type)) return `请输入${label}`;
  if (
    [
      "select",
      "select-v2",
      "cascader",
      "time-select",
      "date-picker",
      "time-picker",
    ].includes(type)
  )
    return `请选择${label}`;
  return "";
};
