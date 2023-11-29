import type { App } from "vue";

import QuickForm from "./quick-form";
import QuickTable from "./quick-table";

const components = [QuickForm, QuickTable];

const install = (Vue: App) => {
  components.forEach((comp) => {
    Vue.component(comp.name, comp);
  });
};

export { QuickForm, QuickTable };

export default install;
