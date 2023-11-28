import QuickForm from "./form-generator";
const components = [QuickForm];

const install = (Vue) => {
  components.forEach((comp) => {
    Vue.component(comp.name, comp);
  });
};

export { QuickForm };

export default install;
