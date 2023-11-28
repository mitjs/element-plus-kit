export const withInstall = (comp) => {
  comp.install = (app) => {
    // 注册组件
    app.component(comp.name, comp);
  };
  return comp;
};
