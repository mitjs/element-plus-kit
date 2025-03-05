import type { CompTypes } from "./types";

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

export const genRules = (props: any) => {

}
/* 格式化事件名 */
export const formatEventName = (eventName: string) => `on${eventName.replace(/(?:^|-)(\w)/g, (_, c) => c.toUpperCase())}`