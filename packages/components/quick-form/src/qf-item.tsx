import {
  defineComponent,
  toRefs,
  inject,
  renderSlot,
  shallowRef,
  effect,
  computed,
} from "vue";
import QFormComponent from "./qf-component";
import QFormButton from "./qf-button";
import type { ItemRowProps, BtnTypeRow, BtnTypeObj } from "./types";
import { QFormItemProps } from "./props";
import { btnsRow, BtnsIconRow } from "./constants";
import { isArray, isFunction, isString } from "lodash-es";
import QFormItem from './form-item.vue'

export default defineComponent({
  props: QFormItemProps,
  setup(props, { attrs }) {
    const { buttons } = toRefs(props);
    const { formSlots }: Record<string, any> = inject("formObserver") as any;

    const renderbtns = shallowRef<Array<BtnTypeRow>>([]);

    effect(() => {
      /* 处理有效buttons */
      if (isArray(buttons.value) && buttons.value.length) {
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
              renderbtns.value.push(item as BtnTypeRow);
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
      isGrid,
      required,
      globalCol,
      renderbtns,
      formSlots,
      buttons,
      readonly
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
    // 布局渲染器
    const layoutRenderer = () => (
      <>
        {formOptions.map((item: ItemRowProps) => {
          const { col, vIf, ...otherItem } = item;

          const isShow = vIf && isFunction(vIf) ? vIf(formValue) : vIf;

          if (isShow) return null;

          if (isGrid) return (
            <el-col key={item.prop} span={col || globalCol}>
              <QFormItem key={item.prop} {...otherItem} readonly={readonly} formValue={formValue} />
            </el-col>
          )
          return (
            <QFormItem key={item.prop} {...otherItem} readonly={readonly} formValue={formValue} />
          );
        })}
        {buttonRenderer()}
      </>
    );

    return <>{layoutRenderer()}</>;
  },
});