const e = (n) => (n.install = (t) => {
  t.component(n.name, n);
}, n);
export {
  e as withInstall
};
