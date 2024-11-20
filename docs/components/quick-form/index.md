# QuickForm

表单生成器,支持 `输入类`、`选择类`, `文本类` 等**16**种的组件，使用表单，您可以快速完成表单页面的构建以及数据的收集、验证和提交。

:::demo
TSelect/single
:::


## QuickForm API
### QuickForm  属性

| **属性名**         | **说明**                                                                                                               | **类型**                      | **默认值** |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------- | ----------------------------- | ---------- |
| model              | 表单数据对象                                                                                                           | ^[object]`Record<string,any>` | -          |
| [options](#option) | 表单项对象集合                                                                                                         | `array`                       | []         |
| buttons            | 默认按钮组集合<br/>默认支持按钮 `search` 、`reset`、`cancel`、`submit` 对应四种触发事件<br />[button配置](#button配置) | `BtnTypeObj`                  | -          |

#### 

| 属性名   | 说明                                                        | 类型                                             |     |
| -------- | ----------------------------------------------------------- | ------------------------------------------------ | --- |
| type     | [表单组件类型](#支持的组件类型)                             | ^[CompTypes]`'input'                             | `   |  |
| label    | 表单项文本                                                  | `string`                                         |     |
| prop     | 属性名                                                      | `string`                                         |     |
| required | 是否必填                                                    | `boolean`                                        |     |
| vif      | 是否显示表单项                                              | `boolean` / ^[Function]`(values:any) => boolean` |     |
| formItem | formItem对应的配置【可参考element-plus组件库form-item配置】 |                                                  |     |
| options  | 选择类组件options配置项，形式如：`[{label:xxx,value:xxx}]`  |                                                  |     |



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

| 类型         | 对应Element-Plus组件                                                                                                                                                                                      | 说明                                               |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------- |
| input        | [Input 输入框](#https://element-plus-docs.bklab.cn/zh-CN/component/input.html)                                                                                                                            |                                                    |
| textarea     | [Input 文本域](#https://element-plus-docs.bklab.cn/zh-CN/component/input.html#%E6%96%87%E6%9C%AC%E5%9F%9F)                                                                                                |                                                    |
| input-number | [Input Number 数字输入框](#https://element-plus-docs.bklab.cn/zh-CN/component/input-number.html)                                                                                                          |                                                    |
| select       | [Select 选择器](#https://element-plus-docs.bklab.cn/zh-CN/component/select.html)                                                                                                                          |                                                    |
| select-v2    | [Virtualized Select 虚拟化选择器](https://element-plus-docs.bklab.cn/zh-CN/component/select-v2.html)                                                                                                      |                                                    |
| cascader     | [Cascader 级联选择器](https://element-plus-docs.bklab.cn/zh-CN/component/cascader.html)                                                                                                                   |                                                    |
| tree-select  | [TreeSelect 树形选择](https://element-plus-docs.bklab.cn/zh-CN/component/tree-select.html)                                                                                                                |                                                    |
| radio        | [Radio 单选框](https://element-plus-docs.bklab.cn/zh-CN/component/radio.html)                                                                                                                             |                                                    |
| checkbox     | [Checkbox 多选框](https://element-plus-docs.bklab.cn/zh-CN/component/checkbox.html)                                                                                                                       |                                                    |
| time-select  | [TimeSelect 时间选择](https://element-plus-docs.bklab.cn/zh-CN/component/time-select.html)                                                                                                                |                                                    |
| date-picker  | [DatePicker 日期选择器](https://element-plus-docs.bklab.cn/zh-CN/component/date-picker.html)<br/>[DateTimePicker 日期时间选择器](https://element-plus-docs.bklab.cn/zh-CN/component/datetime-picker.html) | 支持两种组件，通过组件自身的`type`可配置选择器类型 |
| time-picker  | [TimePicker 时间选择器](https://element-plus-docs.bklab.cn/zh-CN/component/time-picker.html)                                                                                                              |                                                    |
| rate         | [Rate 评分](https://element-plus-docs.bklab.cn/zh-CN/component/rate.html)                                                                                                                                 |                                                    |
| color-picker | [ColorPicker 颜色选择器](https://element-plus-docs.bklab.cn/zh-CN/component/color-picker.html)                                                                                                            |                                                    |
| slider       | [Slider 滑块](https://element-plus-docs.bklab.cn/zh-CN/component/slider.html)                                                                                                                             |                                                    |
| switch       | [Switch 开关](https://element-plus-docs.bklab.cn/zh-CN/component/switch.html)                                                                                                                             |                                                    |
| text         | -                                                                                                                                                                                                         | 文本类组件                                         |
| slot         | -                                                                                                                                                                                                         | 自定义表单组件                                     |

:::





