import {
  defineComponent,
  toRefs,
  inject,
  renderSlot,
  shallowRef,
  effect,
} from "vue";
import QFormComponent from "./qf-component";
import QFormButton from "./qf-button";
import type { ItemRowProps, BtnTypeLabel, BtnTypeObj } from "./types";
import { QFItemProps } from "./props";
import { btnsRow, BtnsIconRow } from "./constants";

export default defineComponent({
  props: QFItemProps,
  setup(props, { attrs }) {
    const { buttons } = toRefs(props);
    const { formSlots }: Record<string, any> = inject("formObserver") as any;

    const renderbtns = shallowRef<Array<BtnTypeLabel>>([]);

    effect(() => {
      /* 处理有效buttons */
      if (Array.isArray(buttons.value) && buttons.value.length) {
        renderbtns.value = [];
        buttons.value.forEach((item: BtnTypeObj) => {
          if (typeof item === "string") {
            if (Object.keys(btnsRow).includes(item)) {
              renderbtns.value.push({
                label: btnsRow[item],
                type: item,
                icon: BtnsIconRow[item],
              });
            }
          } else {
            if (Object.keys(btnsRow).includes(item.type)) {
              renderbtns.value.push(item as BtnTypeLabel);
            }
          }
        });
      }
    });
    return {
      ...toRefs(props),
      renderbtns,
      formSlots,
    };
  },
  render() {
    const {
      formOptions,
      formValue,
      isLayout,
      required,
      globalCol,
      renderbtns,
      formSlots,
      buttons,
    } = this;

    // 按钮组渲染器
    const buttonRenderer = () => {
      const formButton = (
        <el-form-item>
          <QFormButton buttons={renderbtns}></QFormButton>
        </el-form-item>
      );

      if (formSlots?.default) {
        const vaildDefaultSlot = formSlots
          ?.default()
          .filter(
            (item: Record<string, any>) =>
              item.type.toString() !== "Symbol(v-cmt)"
          );
        if (vaildDefaultSlot.length) {
          return formSlots.default();
        } else {
          return formButton;
        }
      } else {
        return formButton;
      }
    };

    // 组件渲染器
    const componentRenderer = (item: ItemRowProps) => {
      const { label, prop, formItem, type, options, component } = item;

      return (
        <el-form-item
          key={prop}
          label={typeof label == "string" ? label : null}
          prop={prop}
          {...formItem}
          v-slots={{
            label: typeof label == "function" ? () => label() : null,
          }}
        >
          <QFormComponent
            label={typeof label == "string" ? label : ""}
            type={type}
            prop={prop}
            formValue={formValue}
            options={options}
            component={component}
          />
        </el-form-item>
      );
    };

    // 布局渲染器
    const layoutRenderer = () => (
      <>
        {formOptions.map((item: ItemRowProps) => {
          const { col } = item;
          return isLayout ? (
            <el-col key={item.prop} span={col || globalCol}>
              {componentRenderer(item)}
            </el-col>
          ) : (
            componentRenderer(item)
          );
        })}
        {buttonRenderer()}
      </>
    );

    return <>{layoutRenderer()}</>;
  },
});
