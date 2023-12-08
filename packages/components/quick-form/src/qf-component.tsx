import { defineComponent, renderSlot, toRefs, inject } from "vue";
import type { IOptionRow, DatePickerType } from './types'
import { defaultPlaceholder } from './utils'
import { QFComponentProps } from './props'
const defaultStyle = {
    width: '100%'
}
export default defineComponent({
    name: "App",
    props: QFComponentProps,
    setup(props, { slots }) {
        const { change, formSlots }: Record<string, any> = inject('formObserver') as any

        const onChange = (e: any, prop: string) => {
            change(e, prop)
        }

        return {
            ...toRefs(props),
            onChange,
            formSlots
        }
    },
    render() {
        const { label, type, formValue, prop, options, component, formSlots }: Record<string, any> = this;
        const { onChange } = this;

        const compRenderer: any = {
            'input': () => {
                return <el-input v-model={formValue[prop]} clearable
                    onChange={(value: any) => { onChange(value, prop) }}
                    placeholder={defaultPlaceholder(type, label)}
                    style={defaultStyle}
                    {...component}>
                </el-input>
            },
            'input-number': () => {
                return <el-input-number v-model={formValue[prop]}
                    onChange={(value: any) => { onChange(value, prop) }}
                    style={defaultStyle}
                    {...component} />
            },
            'select': () => {
                return <el-select v-model={formValue[prop]} clearable
                    placeholder={defaultPlaceholder(type, label)}
                    onChange={(value: any) => { onChange(value, prop) }}
                    style={defaultStyle}
                    {...component} >
                    {options.map((item: IOptionRow) => {
                        return <el-option value={item.value} label={item.label}></el-option>
                    })}
                </el-select>
            },
            'select-v2': () => {
                return <el-select-v2 v-model={formValue[prop]}
                    placeholder={defaultPlaceholder(type, label)}
                    options={options}
                    onChange={(value: any) => { onChange(value, prop) }}
                    style={defaultStyle}
                    {...component} />
            },
            'cascader': () => {
                return <el-cascader v-model={formValue[prop]}
                    options={options}
                    placeholder={defaultPlaceholder(type, label)}
                    onChange={(value: any) => { onChange(value, prop) }}
                    style={defaultStyle}
                    {...component} />
            },
            'time-select': () => {
                return <el-time-select v-model={formValue[prop]}
                    placeholder={defaultPlaceholder(type, label)}
                    onChange={(value: any) => { onChange(value, prop) }}
                    style={defaultStyle}
                    {...component} />
            },
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
                const DEFAULT_FORMATS_TIME = 'HH:mm:ss'
                const DEFAULT_FORMATS_DATE = 'YYYY-MM-DD'
                const dateFormat: { [K in DatePickerType]: string } = {
                    date: DEFAULT_FORMATS_DATE,
                    dates: DEFAULT_FORMATS_DATE,
                    year: 'YYYY',
                    month: 'YYYY-MM',
                    week: 'YYYY-ww',
                    datetime: `${DEFAULT_FORMATS_DATE} ${DEFAULT_FORMATS_TIME}`,
                    daterange: DEFAULT_FORMATS_DATE,
                    monthrange: 'YYYY-MM',
                    datetimerange: `${DEFAULT_FORMATS_DATE} ${DEFAULT_FORMATS_TIME}`,
                }
                const { type }: { type: DatePickerType, [k: string]: any } = component

                return <el-date-picker v-model={formValue[prop]}
                    type={type ? dateFormat[type as DatePickerType] : 'date'}
                    format={dateFormat[type]}
                    value-format={type && type !== 'week' ? dateFormat[type] : null}
                    placeholder={defaultPlaceholder(this.type, label)}
                    onChange={(value: any) => { onChange(value, prop) }}
                    style={defaultStyle}
                    {...component} />
            },
            'time-picker': () => {
                return <el-time-picker v-model={formValue[prop]} placeholder={defaultPlaceholder(type, label)} onChange={(value: any) => { onChange(value, prop) }} style={defaultStyle}  {...component} />
            },
            'color-picker': () => {
                return <el-color-picker v-model={formValue[prop]} onChange={(value: any) => { onChange(value, prop) }}  {...component} />
            },
            'rate': () => {
                return <el-rate v-model={formValue[prop]} onChange={(value: any) => { onChange(value, prop) }}  {...component} />
            },
            'slider': () => {
                return <el-slider v-model={formValue[prop]} onChange={(value: any) => { onChange(value, prop) }} style={{ ...defaultStyle, minWidth: '100px' }}  {...component} />
            },
            'switch': () => {
                return <el-switch v-model={formValue[prop]} onChange={(value: any) => { onChange(value, prop) }}  {...component} />
            },
            'text': () => {
                return formValue[prop];
            },
            'slot': () => {
                return renderSlot(formSlots, prop!);
            }
        }

        return <>
            {compRenderer[type]()}
        </>
    }
})

