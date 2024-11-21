import { defineComponent, renderSlot, toRefs, inject } from "vue";
import type { IOptionRow, DatePickerType, CompTypes } from "./types";
import { defaultPlaceholder } from "./utils";
import { QFComponentProps } from "./props";
import { has, isObject } from "lodash-es";

const defaultStyle = {
  width: "100%",
};
export default defineComponent({
  name: "App",
  props: QFComponentProps,
  setup(props, { slots }) {
    const { onChange, onInput, onClear, onBlur, onFocus, formSlots }: Indexable = inject(
      "formObserver"
    ) as any;

    const { formValue, prop, type, label, orgAttrs, options }: {
      prop: string,
      type: CompTypes,
      label?: string,
      orgAttrs?: Indexable,
      options?: IOptionRow[],
      [K: string]: any
    } = props as any

    const InputEventAblity: CompTypes[] = ['input', 'textarea', 'select', 'select-v2', "slider"]
    const BlurWithFocusEventAblity: CompTypes[] = ['input', 'textarea', 'input-number', 'select', 'select-v2', "time-select", "time-picker", 'date-picker', "color-picker"]
    const ClearEventAblity: CompTypes[] = ['input', 'textarea', 'select', 'select-v2']

    const compEventRow = () => {
      let eventRow: any = {
        onChange: (...arg: any) => {
          onChange(...arg, prop)
        },
      }
      // 具备 input 事件
      if (InputEventAblity.includes(type)) {
        eventRow['onInput'] = (value: any) => onInput(value, prop)
      }

      // 具备 onBlur 和 onFocus 事件
      if (BlurWithFocusEventAblity.includes(type)) {
        eventRow['onBlur'] = (e: FocusEvent) => onBlur(e, prop)
        eventRow['onFocus'] = (e: FocusEvent) => onFocus(e, prop)
      }

      // 具备 clear 事件
      if (ClearEventAblity.includes(type)) {
        eventRow['onClear'] = () => onClear(prop)
      }
      return eventRow
    }


    const compRenderer: any = {
      input: () => {
        return (
          <el-input
            v-model={formValue[prop]}
            clearable
            placeholder={defaultPlaceholder(type, label)}
            style={defaultStyle}
            {...compEventRow()}
            {...orgAttrs}
          >
          </el-input>
        );
      },
      "input-number": () => {
        return (
          <el-input-number
            v-model={formValue[prop]}
            style={defaultStyle}
            {...compEventRow()}
            {...orgAttrs}
          />
        );
      },
      textarea: () => (
        <el-input
          type="textarea"
          v-model={formValue[prop]}
          clearable
          placeholder={defaultPlaceholder(type, label)}
          style={defaultStyle}
          {...compEventRow()}
          {...orgAttrs}
        ></el-input>
      ),
      select: () => {
        return (
          <el-select
            v-model={formValue[prop]}
            clearable
            placeholder={defaultPlaceholder(type, label)}
            style={defaultStyle}
            {...compEventRow()}
            {...orgAttrs}
          >
            {options!.map((item: IOptionRow) => {
              return (
                <el-option value={item.value} label={item.label}></el-option>
              );
            })}
          </el-select>
        );
      },
      "select-v2": () => {
        return (
          <el-select-v2
            v-model={formValue[prop]}
            placeholder={defaultPlaceholder(type, label)}
            options={options}
            clearable
            style={defaultStyle}
            {...compEventRow()}
            {...orgAttrs}
          />
        );
      },
      cascader: () => {
        return (
          <el-cascader
            v-model={formValue[prop]}
            options={options}
            clearable
            placeholder={defaultPlaceholder(type, label)}
            style={defaultStyle}
            {...compEventRow()}
            {...orgAttrs}
          />
        );
      },
      'tree-select': () => {
        return (
          <el-tree-select
            v-model={formValue[prop]}
            data={options}
            clearable
            placeholder={defaultPlaceholder(type, label)}
            style={defaultStyle}
            {...compEventRow()}
            {...orgAttrs}
          />
        )
      },

      "time-select": () => {
        return (
          <el-time-select
            v-model={formValue[prop]}
            placeholder={defaultPlaceholder(type, label)}
            clearable
            style={defaultStyle}
            {...compEventRow()}
            {...orgAttrs}
          />
        );
      },
      radio: () => {
        const isBtnModel = isObject(orgAttrs) && has(orgAttrs, 'button') && orgAttrs.button == true;
        return (
          <el-radio-group
            v-model={formValue[prop]}
            {...compEventRow()}
            {...orgAttrs}
          >
            {options!.map((item: IOptionRow) => {
              return isBtnModel ? <el-radio-button {...item} label={item.value} >{item.label}</el-radio-button> : <el-radio {...item} label={item.value}>{item.label}</el-radio>;
            })}
          </el-radio-group>
        );
      },
      checkbox: () => {
        const isBtnModel = isObject(orgAttrs) && has(orgAttrs, 'button') && orgAttrs.button == true
        return (
          <el-checkbox-group
            v-model={formValue[prop]}
            {...compEventRow()}
            {...orgAttrs}
          >
            {options!.map((item: IOptionRow) => {
              return (
                isBtnModel ? <el-checkbox-button label={item.value}>{item.label}</el-checkbox-button> : <el-checkbox label={item.value}>{item.label}</el-checkbox>
              );
            })}
          </el-checkbox-group>
        );
      },
      "date-picker": () => {
        const DEFAULT_FORMATS_TIME = "HH:mm:ss";
        const DEFAULT_FORMATS_DATE = "YYYY-MM-DD";
        const dateFormat: { [K in DatePickerType]: string } = {
          date: DEFAULT_FORMATS_DATE,
          dates: DEFAULT_FORMATS_DATE,
          year: "YYYY",
          month: "YYYY-MM",
          week: "YYYY-ww",
          datetime: `${DEFAULT_FORMATS_DATE} ${DEFAULT_FORMATS_TIME}`,
          daterange: DEFAULT_FORMATS_DATE,
          monthrange: "YYYY-MM",
          datetimerange: `${DEFAULT_FORMATS_DATE} ${DEFAULT_FORMATS_TIME}`,
        };
        // const { type:compType }: { type: DatePickerType; [k: string]: any } = orgAttrs;
        const compType: DatePickerType = isObject(orgAttrs) && has(orgAttrs, 'type') ? orgAttrs.type : 'date' as any
        return (
          <el-date-picker
            v-model={formValue[prop]}
            clearable
            placeholder={defaultPlaceholder(type, label)}
            type={compType ? dateFormat[compType] : "date"}
            format={dateFormat[compType]}
            value-format={compType && compType !== "week" ? dateFormat[compType] : null}
            style={defaultStyle}
            {...compEventRow()}
            {...orgAttrs}
          />
        );
      },
      "time-picker": () => {
        return (
          <el-time-picker
            v-model={formValue[prop]}
            placeholder={defaultPlaceholder(type, label)}
            clearable
            style={defaultStyle}
            {...compEventRow()}
            {...orgAttrs}
          />
        );
      },
      "color-picker": () => {
        return (
          <el-color-picker
            v-model={formValue[prop]}
            {...compEventRow()}
            {...orgAttrs}
          />
        );
      },
      rate: () => {
        return (
          <el-rate
            v-model={formValue[prop]}
            {...compEventRow()}
            {...orgAttrs}
          />
        );
      },
      slider: () => {
        return (
          <el-slider
            v-model={formValue[prop]}
            style={{ ...defaultStyle, minWidth: "100px" }}
            {...compEventRow()}
            {...orgAttrs}
          />
        );
      },
      switch: () => {
        return (
          <el-switch
            v-model={formValue[prop]}
            {...compEventRow()}
            {...orgAttrs}
          />
        );
      },
      text: () => {
        return formValue[prop];
      },
      html: () => {
        return <div v-html={formValue[prop]}></div>
      },
      slot: () => {
        return renderSlot(formSlots, prop!);
      },
    };

    return () => (<>{compRenderer[type]()}</>)
  },
});
