import { mergePath } from '../utils'
export default [
  { text: "📒指南", link: mergePath("/guide/design"), activeMatch: "^/doc/guide/" },
  { text: "📦组件", link: mergePath("/component/quick-form/index"), activeMatch: "^/doc/component/" },
  // { text: "QForm", link: mergePath("/component/quick-form/index") },

  {
    text: '🚀Element 家族', items: [
      { text: 'Element Plus（Vue3）', link: 'https://element-plus.org/zh-CN/' },
      { text: 'Element UI （Vue2）', link: 'https://element.eleme.cn/#/zh-CN' },
    ]
  },
  { text: "🤖提Issue", link: 'https://github.com/mitjs/vant4-kit/issues' },
  { text: '👉🏻Vant4-kit', link: 'https://vant4-kit.netlify.app/' },
] as any;
