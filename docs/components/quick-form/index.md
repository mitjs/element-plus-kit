# QuickForm

快捷表单，旨在优化element-plus表单开发过程的**代码冗余**，**配置繁琐**等问题。使用`QuickForm`，您可以快速完成表单页面的构建以及数据的收集、验证和提交。目前`QuickForm`已支持 `输入类`、`选择类`、 `文本类` 等[**19**种的组件](#支持的组件类型)。

## 基础用法
:::demo
QuickForm/base
:::

## 行内表单
:::demo
QuickForm/inline-form
:::

## 对其方式、尺寸控制、栅格布局
:::demo
QuickForm/label-postion-form
:::


## 检验表单、控制隐藏

### 校验表单
:::demo
QuickForm/validate-form
:::

### 显隐控制

通过表单配置项 `formOption` 下的`vIf`,可以实现表单项的显隐控制。

`vIf` 类型为 `boolean` 或 一个返回`boolean`值方法， `true` 时显示，`false` 时隐藏。
```ts
{
  ...,
  vIf: (vals: any) => {
    // vals 为表单收集的数据对象
      return true
  }
}
// 或
{
  ...,
  vIf: true
}
```
1. **表单自身显隐控制**
:::demo
QuickForm/form-showHide
:::
1. **外部控制表单显隐**
:::demo
QuickForm/form-showHide-out
:::

## 只读表单

设置`readonly` 可开启表单只读模式

:::demo
QuickForm/readonly-form
:::


## QuickForm API
### QuickForm  属性

以下是`QuickForm` **新增属性**，Element-Plus 的 [Form 表单](https://element-plus-docs.bklab.cn/zh-CN/component/form.html#form-attributes) 原始配置均支持

| **属性名**  | **说明**                                                     | **类型**                      | **默认值** |
| ----------- | ------------------------------------------------------------ | ----------------------------- | ---------- |
| model       | 表单数据对象                                                 | ^[object]`Record<string,any>` | -          |
| formOptions | [表单项对象](#表单项对象Item)集合                            | `ItemRowProps[]`              | `[]`       |
| required    | 是否为必填项，如不设置，则会根据校验规则确认                 | `boolean`                     | `false`    |
| gutter      | 表单栅格间距                                                 | `number`                      | -          |
| col         | 表单栅格占据的列数，配置后会开起栅格布局，默认不开启         | `number`                      | -          |
| readonly    | 是否只读                                                     | `boolean`                     | `false`    |
| buttons     | 默认按钮组集合<br/>默认支持按钮 `search` 、`reset`、`cancel`、`submit` 对应四种触发事件<br />[button配置](#button配置) | `BtnTypeObj`                  | -          |

####  表单项对象Item

| 属性名   | 说明                                                                                                           | 类型                                                                                                                                                                                                                                      | 是否比填 |
| -------- | -------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| type     | [表单组件类型](#支持的组件类型)                                                                                | ^[CompTypes]`'input'\|'textarea'\|'input-number'\|'select'\|'select-v2'\|'cascader'\|'tree-select'\|'radio'\|'checkbox'\|'time-select'\|'date-picker'\|'time-picker'\|'rate'\|'color-picker'\|'slider'\|'switch'\|'text'\|'html'\|'slot'` |          |
| label    | 表单项文本                                                                                                     | `string` \|`() => VNode`                                                                                                                                                                                                                  | 是       |
| prop     | 属性名                                                                                                         | `string`                                                                                                                                                                                                                                  | 是       |
| required | 是否必填                                                                                                       | `boolean`/ ^[Function]`() => boolean`                                                                                                                                                                                                     | 否       |
| vif      | 是否显示表单项，默认`true`                                                                                     | `boolean` / ^[Function]`(values:any) => boolean`                                                                                                                                                                                          | 否       |
| formItem | [element-plus【form-item】相关配置](https://element-plus-docs.bklab.cn/zh-CN/component/form.html#formitem-api) |                                                                                                                                                                                                                                           | 否       |
| options  | **选择类组件**选项配置，形式如：`[{label:xxx,value:xxx}]`                                                      | ^[IOptionRow]`intreface IOptionRow {label:string,value:Numric} `                                                                                                                                                                          | 否       |
| col      | 表单栅格占据的列数                                                                                             | `number`                                                                                                                                                                                                                                  | 否       |
| attrs    | `type` 对应原始组件的属性及方法                                                                                | `object`                                                                                                                                                                                                                                  | 否       |



### QuickForm  事件

| **事件名** | **说明**                                                                                   | **类型**                                                                     |
| ---------- | ------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------- |
| validate   | 任一表单项被校验后触发                                                                     | ^[Function]`(prop: FormItemProp, isValid: boolean, message: string) => void` |
| change     | 任一表单项被改变后触发 <br/>`value` 改变之后的值，<br/>`prop` 当前触发的表单项绑定的prop值 | ^[Function]`(value: any, prop: string) => void`                              |
| input      | 输入型表单项在 Input 值改变时触发                                                          | ^[Function]`(value: string , prop: string) => void`                          |
| blur       | 当具备 `Blur` 事件的任一表单项失去焦点时触发                                               | ^[Function]`(event: FocusEvent, prop: string) => void`                       |
| focus      | 当具备 `Focus` 事件的任一表单项获得焦点时触发                                              | ^[Function]`(event: FocusEvent, prop: string) => void`                       |
| clear      | 在点击由 `clearable` 属性生成的清空按钮时触发                                              | ^[Function]`() => void`                                                      |
| search     | 点击默认支持按钮 `search` 时触发                                                           | ^[Function]`() => void`                                                      |
| reset      | 点击默认支持按钮 `reset` 时触发                                                            | ^[Function]`() => void`                                                      |
| cancel     | 点击默认支持按钮 `cancel` 时触发                                                           | ^[Function]`() => void`                                                      |
| submit     | 点击默认支持按钮 `submit` 时触发                                                           | ^[Function]`() => void`                                                      |



### QuickForm 方法

| **名称**      | **说明**                                                        | **类型**                                                        |
| ------------- | --------------------------------------------------------------- | --------------------------------------------------------------- |
| validate      | 对整个表单的内容进行验证。 接收一个回调函数，或返回 `Promise`。 | ^[Function]`(callback?: FormValidateCallback) => Promise<void>` |
| validateField | 验证具体的某个字段。                                            | ^[Function]``                                                   |
| resetFields   | 重置该表单项，将其值重置为初始值，并移除校验结果                | ^[Function]``                                                   |
| scrollToField | 滚动到指定的字段                                                | ^[Function]`(prop: FormItemProp) => void`                       |
| clearValidate | 清理某个字段的表单验证信息。                                    | ^[Function]``                                                   |



### QuickForm 插槽

| **事件名** | **说明**                            | **子标签** |
| ---------- | ----------------------------------- | ---------- |
| default    | 自定义默认内容                      | FormItem   |
| `[prop]`   | options中配置任一表单项对象中的prop |            |
|            |                                     |            |

#### button配置

| 按钮类型 | 触发对应事件 |     |
| -------- | ------------ | --- |
| search   | search       |     |
| reset    | reset        |     |
| cancel   | cancel       |     |
| submit   | submit       |     |



#### 支持的组件类型

::: tip 组件类型

| 类型         | 对应Element-Plus组件                                                                                                                                                                                      | 说明                                                           |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------- |
| input        | [Input 输入框](https://element-plus-docs.bklab.cn/zh-CN/component/input.html)                                                                                                                             |                                                                |
| textarea     | [Input 文本域](https://element-plus-docs.bklab.cn/zh-CN/component/input.html#%E6%96%87%E6%9C%AC%E5%9F%9F)                                                                                                 |                                                                |
| input-number | [Input Number 数字输入框](https://element-plus-docs.bklab.cn/zh-CN/component/input-number.html)                                                                                                           |                                                                |
| radio        | [Radio 单选框](https://element-plus-docs.bklab.cn/zh-CN/component/radio.html)                                                                                                                             |                                                                |
| checkbox     | [Checkbox 多选框](https://element-plus-docs.bklab.cn/zh-CN/component/checkbox.html)                                                                                                                       |                                                                |
| select       | [Select 选择器](https://element-plus-docs.bklab.cn/zh-CN/component/select.html)                                                                                                                           |                                                                |
| select-v2    | [Virtualized Select 虚拟化选择器](https://element-plus-docs.bklab.cn/zh-CN/component/select-v2.html)                                                                                                      |                                                                |
| cascader     | [Cascader 级联选择器](https://element-plus-docs.bklab.cn/zh-CN/component/cascader.html)                                                                                                                   |                                                                |
| tree-select  | [TreeSelect 树形选择](https://element-plus-docs.bklab.cn/zh-CN/component/tree-select.html)                                                                                                                |                                                                |
| time-select  | [TimeSelect 时间选择](https://element-plus-docs.bklab.cn/zh-CN/component/time-select.html)                                                                                                                |                                                                |
| date-picker  | [DatePicker 日期选择器](https://element-plus-docs.bklab.cn/zh-CN/component/date-picker.html)<br/>[DateTimePicker 日期时间选择器](https://element-plus-docs.bklab.cn/zh-CN/component/datetime-picker.html) | 支持Element-Plus两种组件，通过组件自身的`type`可配置选择器类型 |
| time-picker  | [TimePicker 时间选择器](https://element-plus-docs.bklab.cn/zh-CN/component/time-picker.html)                                                                                                              |                                                                |
| rate         | [Rate 评分](https://element-plus-docs.bklab.cn/zh-CN/component/rate.html)                                                                                                                                 |                                                                |
| color-picker | [ColorPicker 颜色选择器](https://element-plus-docs.bklab.cn/zh-CN/component/color-picker.html)                                                                                                            |                                                                |
| slider       | [Slider 滑块](https://element-plus-docs.bklab.cn/zh-CN/component/slider.html)                                                                                                                             |                                                                |
| switch       | [Switch 开关](https://element-plus-docs.bklab.cn/zh-CN/component/switch.html)                                                                                                                             |                                                                |
| text         | -                                                                                                                                                                                                         | 渲染普通文本                                                   |
| html         | -                                                                                                                                                                                                         | 渲染html片段                                                   |
| slot         | -                                                                                                                                                                                                         | 自定义表单组件                                                 |

:::

## 类型申明

::: details 类型申明

```ts
type Numric = string | number;

type CompTypes = "input" | 'textarea' | "input-number" | "select" | "select-v2" | "cascader" | "radio" | "checkbox" | "tree-select" | "time-select" | "date-picker" | "time-picker" | "color-picker" | "rate" | "slider" | "switch" | "text" | "html" | "slot";

type BtnType = "search" | "reset" | "cancel" | "submit";

type IOptionRow = {
  label: string;
  value: Numric;
  children?: Array<IOptionRow>;
} & Indexable

type ItemRowProps = {
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

type BtnTypeRow = {
  label: string;
  type: BtnType;
  icon?: string;
}

type BtnTypeObj = BtnTypeRow | BtnType;

type DatePickerType = "date" | "dates" | "year" | "month" | "week" | "datetime" | "daterange" | "monthrange" | "datetimerange";
```





:::



