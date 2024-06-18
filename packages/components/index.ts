import type { App, Component } from "vue";
// import * as comps from './components'
// console.log('Comps', comps);

import QuickForm from "./quick-form";
import QuickTable from "./quick-table";

const components = [QuickForm, QuickTable];

const install = (app: App) => {
  components.forEach((comp) => {
    app.component(comp.name, comp);
  });
};

export { QuickForm, QuickTable };

export default install;
