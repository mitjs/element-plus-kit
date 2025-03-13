import { ElCascader, ElCheckbox, ElCheckboxButton, ElCheckboxGroup, ElColorPicker, ElDatePicker, ElFormItem, ElInput, ElInputNumber, ElOption, ElRadio, ElRadioButton, ElRadioGroup, ElRate, ElSelect, ElSelectV2, ElSlider, ElSwitch, ElTimePicker, ElTimeSelect, ElTreeSelect, type FormItemRule, } from "element-plus";
import { defineComponent, inject, renderSlot, type PropType, type VNode } from "vue";
import type { CompTypes, FormItemRows, FormProvideProps, ItemOptions } from "./types";
import { defaultPlaceholder, formatEventName } from "./utils";
import { compEventMap, compSlotsMap } from "./constants";
import { has, isFunction } from "lodash-es";

export default defineComponent({
    name: "FormItem",
    props: {
        model: {
            type: Object,
            required: true,
            default: () => ({})
        },
        label: {
            type: String || Function,
            default: ''
        },
        type: {
            type: String as PropType<CompTypes>,
            required: true,
        },
        name: {
            type: String,
            required: true,
            default: '',
        },
        allRequired: {
            type: Boolean,
            default: false,
        },
        isReadonly: {
            type: Boolean,
            default: false,
        },
        config: {
            type: Object as PropType<FormItemRows>,
            default: () => ({}),
        },
        itemProps: {
            type: Object,
            default: () => ({}),
        },
        compProps: {
            type: Object,
            default: () => ({}),
        }
    },
    setup(props, { slots }) {
        const { label, type, name, model, config, isReadonly, allRequired, itemProps, compProps } = props;
        const { formSlots, events } = inject('formContext') as FormProvideProps

        const handleItemSlots = () => {
            let itemSlots: any = {}
            const labelSlot = `${name}.label`
            if (isFunction(label)) {
                itemSlots['label'] = (...args: any) => label(...args)
            }
            if (has(formSlots, labelSlot)) {
                itemSlots['label'] = (...args: any) => renderSlot(formSlots, labelSlot, ...args)
            }
            return itemSlots
        }
        /* 处理组件插槽 */
        const handleCompSlots = () => {
            let slotsMap: Indexable = {}
            const isSlots = (slotName: string) => has(compProps, 'slots') && has(compProps.slots, slotName)
            const renderVaildSlot = (sname: string, ...args: any) => {
                if (isFunction(compProps.slots[sname])) {
                    return compProps.slots[sname](...args)
                } else {
                    return new Error(`slots.${sname} must be a function`)
                }
            }

            compSlotsMap[type]?.forEach((slotName: string) => {
                const sname = `${name}.${slotName}`;
                if (has(formSlots, sname) || isSlots(slotName)) {
                    slotsMap[slotName] = (...args: any) => isSlots(slotName) ? renderVaildSlot(slotName, ...args) : renderSlot(formSlots, sname, ...args)
                }
            })
            return slotsMap
        }

        /* 处理组件事件 */
        const handleEvents = () => {
            let eventRow: any = {}
            compEventMap[type]?.forEach((event) => {
                eventRow[formatEventName(event)] = (...arg: any) => events(event, name, ...arg)
            })
            return eventRow
        }

        const getAttrs = () => {
            let defaultConfig = {
                placeholder: isReadonly ? '' : defaultPlaceholder(type, label),
                clearable: !isReadonly,
                readonly: isReadonly,
            }

            if (!['checkbox'].includes(type)) {
                Object.assign(defaultConfig, {
                    style: {
                        width: '100%'
                    },
                })
            }

            /* 只读 */
            if (['select', 'select-v2', 'cascader', 'tree-select', 'time-select', 'radio', 'checkbox', 'color-picker', 'slider', 'switch'].includes(type)) {
                Object.assign(defaultConfig, {
                    disabled: isReadonly,
                    class: "qform-item-comp-readonly",
                })
            }

            /* 禁用 */
            if (['rate',].includes(type)) {
                Object.assign(defaultConfig, {
                    disabled: isReadonly
                })
            }

            return Object.assign({}, defaultConfig, compProps);
        }
        const getRequired = () => {
            if (has(config, 'required')) {
                if (isFunction(config.required)) {
                    return config.required(model)
                } else {
                    return config.required
                }
            }
            return allRequired
        }
        const handleRules = (): FormItemRule[] => {
            let rules: FormItemRule[] = [];
            if (getRequired()) {
                rules.push({ required: true, message: `${label}不能为空`, trigger: ['blur', 'change'] })
            }
            if (has(itemProps, 'rules')) {
                rules = rules.concat(itemProps.rules)
            }
            return rules
        }

        const compRenderer: { [k in CompTypes]: () => VNode } = {
            'input': () => {
                return <ElInput v-model={model[name]} {...getAttrs()} {...handleEvents()} v-slots={handleCompSlots()} />
            },
            'input-number': () => {
                return <ElInputNumber v-model={model[name]}  {...getAttrs()} {...handleEvents()} v-slots={handleCompSlots()} />
            },
            'textarea': () => {
                return <ElInput v-model={model[name]} type="textarea" {...getAttrs()} {...handleEvents()} />
            },
            'select': () => {
                const { options } = config
                return <ElSelect
                    v-model={model[name]}
                    {...getAttrs()}
                    {...handleEvents()}
                    v-slots={handleCompSlots()}
                >
                    {options!.map((item: ItemOptions) => {
                        return (
                            <ElOption  {...item} value={item.value} label={item.label}></ElOption>
                        );
                    })}
                </ElSelect>
            },

            'select-v2': () => {
                const { options } = config
                return <ElSelectV2
                    v-model={model[name]}
                    options={options}
                    {...getAttrs()}
                    {...handleEvents()}
                    v-slots={handleCompSlots()}
                />
            },

            'time-select': () => {
                return <ElTimeSelect
                    v-model={model[name]}
                    {...getAttrs()}
                    {...handleEvents()}
                />
            },
            'tree-select': () => {
                const { options } = config
                return <ElTreeSelect
                    v-model={model[name]}
                    data={options}
                    {...getAttrs()}
                    {...handleEvents()}
                />
            },
            'cascader': () => {
                const { options } = config
                return <ElCascader
                    v-model={model[name]}
                    options={options}
                    {...getAttrs()}
                    {...handleEvents()}
                />
            },

            'time-picker': () => {
                return <ElTimePicker
                    v-model={model[name]}
                    {...getAttrs()}
                    {...handleEvents()}
                />
            },
            'date-picker': () => {
                return <ElDatePicker
                    v-model={model[name]}
                    {...getAttrs()}
                    {...handleEvents()}
                    v-slots={handleCompSlots()}
                />
            },
            'checkbox': () => {
                const { options = [] } = config
                const isButton = has(compProps, 'button') && compProps.button == true
                return <ElCheckboxGroup
                    v-model={model[name]}
                    {...getAttrs()}
                    {...handleEvents()}
                >
                    {options!.map((item: ItemOptions) => {
                        return (
                            isButton ? <ElCheckboxButton {...item} label={item.value}>{item.label}</ElCheckboxButton> : <ElCheckbox {...item} label={item.value}>{item.label}</ElCheckbox>
                        );
                    })}
                </ElCheckboxGroup>
            },
            'radio': () => {
                const { options = [] } = config
                const isButton = has(compProps, 'button') && compProps.button == true
                return <ElRadioGroup
                    v-model={model[name]}
                    {...getAttrs()}
                    {...handleEvents}
                >
                    {options!.map((item: ItemOptions) => {
                        return isButton ? <ElRadioButton {...item} label={item.value} >{item.label}</ElRadioButton> : <ElRadio {...item} label={item.value}>{item.label}</ElRadio>;
                    })}
                </ElRadioGroup>
            },
            'color-picker': () => {
                return <ElColorPicker
                    v-model={model[name]}
                    {...getAttrs()}
                    {...handleEvents()}
                />
            },
            'switch': () => {
                return <ElSwitch
                    v-model={model[name]}
                    {...getAttrs()}
                    {...handleEvents()}
                    v-slots={handleCompSlots()}
                />
            },
            'rate': () => {
                return <ElRate
                    v-model={model[name]}
                    {...getAttrs()}
                    {...handleEvents()}
                />
            },
            'slider': () => {
                return <ElSlider
                    v-model={model[name]}
                    {...getAttrs()}
                    {...handleEvents()}

                />
            },
            text: () => {
                return model[name];
            },
            html: () => {
                return <div v-html={model[name]}></div>
            },
            slot: () => {
                return renderSlot(formSlots, name!,);
            },
        }
        return () => {
            return <ElFormItem {...itemProps} label={label} prop={name} rules={handleRules()} v-slots={handleItemSlots()} >
                {compRenderer[type]()}
            </ElFormItem>
        }
    }
})