# QuickFrom

表单生成器,支持 `输入类`、`选择类`, `文本类` 等**16**种的组件，使用表单，您可以快速完成表单页面的构建以及数据的收集、验证和提交。

<!-- :::demo
TSelect/single
::: -->


##  Api
### 属性（Attributes）

| **属性名** | **说明**                                                                                                           | **类型**                      | **默认值** |
| ---------- | ------------------------------------------------------------------------------------------------------------------ | ----------------------------- | ---------- |
| model      | 表单数据对象                                                                                                       | ^[object]`Record<string,any>` | -          |
| options    | 表单项对象集合                                                                                                     | `array`                       | []         |
| buttons    | 默认按钮组集合<br/>默认支持按钮 `search` 、`reset`、`cancel`、`submit` 对应四种触发事件<br />[button配置](#button) | `array`                       | -          |



### 事件（Events） 

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



### 方法（Exposes） 

| **名称**      | **说明**                                                        | **类型**                                                        |
| ------------- | --------------------------------------------------------------- | --------------------------------------------------------------- |
| validate      | 对整个表单的内容进行验证。 接收一个回调函数，或返回 `Promise`。 | ^[Function]`(callback?: FormValidateCallback) => Promise<void>` |
| validateField | 验证具体的某个字段。                                            | ^[Function]``                                                   |
| resetFields   | 重置该表单项，将其值重置为初始值，并移除校验结果                | ^[Function]``                                                   |
| scrollToField | 滚动到指定的字段                                                | ^[Function]`(prop: FormItemProp) => void`                       |
| clearValidate | 清理某个字段的表单验证信息。                                    | ^[Function]``                                                   |



### 插槽（Slots） 

| **事件名**                        | **说明**                            | **子标签** |
| --------------------------------- | ----------------------------------- | ---------- |
| default                           | 自定义默认内容                      | FormItem   |
| ^[prop]`任一表单项对象中的prop值` | options中配置任一表单项对象中的prop |            |
|                                   |                                     |            |



### 默认按钮配置





