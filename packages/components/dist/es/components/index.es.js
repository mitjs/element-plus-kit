import t from "./form-generator/index.es.js";
const e = [t], a = (n) => {
  e.forEach((o) => {
    n.component(o.name, o);
  });
};
export {
  t as FormGenerator,
  a as default
};
