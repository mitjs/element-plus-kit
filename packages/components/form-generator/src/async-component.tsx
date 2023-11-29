import { PropType, defineComponent, renderSlot, toRefs, inject } from "vue";
import type { RenderComp, CompTypes, IOptionRow } from '../types'

export default defineComponent({
    name: "App",
    props: {
        // 组件类型
        type: {
            type: String as PropType<CompTypes>,
            default: 'input'
        },
        prop: String,
        formValue: {
            type: Object,
            default: () => { }
        },
        options: {
            type: Array as PropType<Array<IOptionRow>>,
            required: false,
            default: () => []
        },
        component: {
            type: Object,
            default: () => { }
        },

    },
    setup(props) {
        const { change }: Record<string, any> = inject('formObserver') as any
        // console.log('=============================================');
        const onChange = (e: any, prop: string) => {
            change(e, prop)
        }
        const onInput = (e: any, prop: string) => {
            console.log('onInput', e, prop);
        }
        const onFocus = (e: any, prop: string) => {
            console.log('onFocus', e, prop);
        }
        const onBlur = (e: any, prop: string) => {
            console.log('onBlur', e, prop);
        }
        const onClear = (e: any, prop: string) => {
            console.log('onClear', e, prop);
        }
        return {
            ...toRefs(props),
            onChange,
            onInput, onFocus,
            onBlur,
            onClear
        }
    },
    render() {
        const { type, formValue, prop, options, component }: Record<string, any> = this;
        const { onChange, onInput, onFocus, onBlur, onClear } = this;

        const compRenderer: any = {
            'input': () => {
                return <el-input v-model={formValue[prop]} clearable
                    onChange={(value: any) => { onChange(value, prop) }}
                    {...component}
                >
                </el-input>
            },
            'input-number': () => {
                return <el-input-number v-model={formValue[prop]}
                    onChange={(value: any) => { onChange(value, prop) }}
                    {...component} />
            },
            'select': () => {
                return <el-select v-model={formValue[prop]} clearable
                    onChange={(value: any) => { onChange(value, prop) }}
                    {...component} >
                    {options.map((item: IOptionRow) => {
                        return <el-option value={item.value} label={item.label}></el-option>
                    })}
                </el-select>
            },
            'select-v2': () => <el-select-v2 v-model={formValue[prop]} options={options} onChange={(value: any) => { onChange(value, prop) }} {...component} />,
            'cascader': () => <el-cascader v-model={formValue[prop]} options={options} onChange={(value: any) => { onChange(value, prop) }} {...component} />,
            'time-select': () => <el-time-select v-model={formValue[prop]} onChange={(value: any) => { onChange(value, prop) }} {...component} />,
            'radio': () => {
                return <el-radio-group v-model={formValue[prop]} onChange={(value: any) => { onChange(value, prop) }}  {...component} >
                    {options.map((item: IOptionRow) => {
                        return <el-radio label={item.value}>{item.label}</el-radio>
                    })}
                </el-radio-group>
            },
            'checkbox': () => {
                return <el-checkbox-group v-model={formValue[prop]} onChange={(value: any) => { onChange(value, prop) }}  {...component} >
                    {options.map((item: IOptionRow) => {
                        return <el-checkbox label={item.value}>{item.label}</el-checkbox>
                    })}
                </el-checkbox-group>
            },
            'date-picker': () => {
                return <el-date-picker v-model={formValue[prop]} onChange={(value: any) => { onChange(value, prop) }}  {...component} />
            },
            'time-picker': () => {
                return <el-time-picker v-model={formValue[prop]} onChange={(value: any) => { onChange(value, prop) }}  {...component} />
            },
            'color-picker': () => {
                return <el-color-picker v-model={formValue[prop]} onChange={(value: any) => { onChange(value, prop) }}  {...component} />
            },
            'rate': () => {
                return <el-rate v-model={formValue[prop]} onChange={(value: any) => { onChange(value, prop) }}  {...component} />
            },
            'slider': () => {
                return <el-slider v-model={formValue[prop]} onChange={(value: any) => { onChange(value, prop) }}  {...component} />
            },
            'switch': () => {
                return <el-switch v-model={formValue[prop]} onChange={(value: any) => { onChange(value, prop) }}  {...component} />
            },
            'text': () => {
                return formValue[prop];
            },
            'slot': () => {
                return formValue[prop];
            }
        }

        return <>
            {compRenderer[type]()}
        </>
    }
})

