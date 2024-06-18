import {
  defineComponent,
  ref,
  toRefs,
  defineExpose,
  watch,
  provide,
  onMounted,
  computed,
  effect,
  reactive,
  VNode,
} from "vue";
import QFormItem from "./qf-item";
import type { ItemRowProps, Arrayable, BtnType, BtnTypeObj } from "./types";
import type {
  FormInstance,
  FormValidateCallback,
  FormItemProp,
  FormRules,
} from "element-plus";
import { findFirstHaveColFormItem } from "./utils";
import { QFromProps } from "./props";

export default defineComponent({
  name: "QuickForm",
  props: QFromProps,
  emits: ["change", "validate", "search", "reset", "cancel", "submit"],
  setup(props, { attrs, slots, emit, expose }) {
    const {
      col,
      buttons,
      formOptions,
      required,
      rules,
      resetActiveSearch,
      model,
    } = toRefs(props);
    const { gutter } = toRefs(attrs);
    const formRef = ref<FormInstance>();
    let newRules = reactive<FormRules<Record<string, any>>>({});

    const fCol = findFirstHaveColFormItem(
      formOptions.value
    ); /* 第一个设置栅格的表单项 */
    const globalCol = computed(() => {
      return col.value || fCol;
    }); /* 计算栅格布局值 */
    const isLayout = ref(globalCol ? true : false); /* 是否开启layout布局 */

    // 处理 rules 副作用
    effect(() => {
      if (required.value && !rules.value) {
        formOptions.value.forEach((item) => {
          newRules[item.prop] = [
            {
              required: true,
              message: `${
                typeof item.label == "string" ? item.label : item.prop
              }不能为空`,
              trigger: ["blur", "change"],
            },
          ];
        });
      } else {
        newRules = { ...rules.value };
      }
    });

    /* ================================== form 事件触发 start ===================================== */
    const onChange = (value: any, prop: string) => {
      emit("change", value, prop);
    };
    const onValidate = (
      prop: FormItemProp,
      isValid: boolean,
      message: string
    ): void => {
      emit("validate", prop, isValid, message);
    };

    const onBtnEvent = (event: BtnType): void => {
      if (resetActiveSearch.value && event === "reset") {
        formRef.value?.resetFields();
        emit("search");
      }
      emit(event);
    };
    /* ================================== form 事件触发 end ===================================== */

    /* ================================== form 实例化方法 start ================================== */
    const validateField = (
      props?: Arrayable<FormItemProp> | undefined,
      callback?: FormValidateCallback | undefined
    ) => formRef.value?.validateField(props, callback);
    const validate = async (callback?: FormValidateCallback) => {
      formRef.value?.validate(callback);
    };
    const resetFields = (props?: Arrayable<FormItemProp> | undefined) => {
      formRef.value?.resetFields(props);
    };
    const scrollToField = (prop: FormItemProp) =>
      formRef.value?.scrollToField(prop);
    const clearValidate = (props?: Arrayable<FormItemProp> | undefined) =>
      formRef.value?.clearValidate(props);

    expose({
      validate,
      validateField,
      resetFields,
      scrollToField,
      clearValidate,
    });
    /* ================================== form 实例化方法 end ================================== */

    provide<{
      formSlots: Record<string, any>;
      validate: (callback?: FormValidateCallback) => Promise<void>;
      change: (value: any, prop: string) => void;
      btnEvent: (event: BtnType) => void;
    }>("formObserver", {
      formSlots: slots,
      validate: validate,
      change: onChange,
      btnEvent: onBtnEvent,
    });

    return {
      formRef,
      ...toRefs(props),
      attrs,
      isLayout,
      globalCol,
      newRules,
      onValidate,
    };
    // const rowRenderer = () => {
    //   return (
    //     <>
    //       <QFormItem
    //         formValue={model}
    //         formOptions={formOptions.value}
    //         isLayout={isLayout.value}
    //         globalCol={globalCol.value}
    //         buttons={buttons.value}
    //       />
    //     </>
    //   );
    // };

    // return () => (
    //   <>
    //     <el-form
    //       ref="formRef"
    //       model={model}
    //       rules={newRules}
    //       {...attrs}
    //       onValidate={onValidate}
    //     >
    //       {isLayout ? (
    //         <el-row gutter={gutter.value}>{rowRenderer()}</el-row>
    //       ) : (
    //         rowRenderer()
    //       )}
    //     </el-form>
    //   </>
    // );
  },
  render() {
    const {
      model,
      newRules,
      formOptions,
      isLayout,
      attrs,
      gutter,
      globalCol,
      buttons,
      onValidate,
    } = this;

    // 渲染formitem项
    const rowRenderer = () => {
      return (
        <>
          <QFormItem
            formValue={model}
            formOptions={formOptions}
            isLayout={isLayout}
            globalCol={globalCol}
            buttons={buttons}
          />
        </>
      );
    };

    return (
      <>
        <el-form
          ref="formRef"
          size="large"
          model={model}
          rules={newRules}
          {...attrs}
          onValidate={onValidate}
        >
          {isLayout ? (
            <el-row gutter={gutter}>{rowRenderer()}</el-row>
          ) : (
            rowRenderer()
          )}
        </el-form>
      </>
    );
  },
});
