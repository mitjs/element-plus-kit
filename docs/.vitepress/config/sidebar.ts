import { mergePath } from '../utils'
export default {
  "/doc/component/": [
    {
      text: "组件",
      items: [
        { text: "📜 QForm 表单", link: mergePath("/component/quick-form/index") },
        { text: "🗃️ QTable 表格", link: mergePath("/component/quick-table/index") },
      ]
    }
  ],
  "/doc/guide/": [
    { text: "设计", link: mergePath("/guide/design") },
    {
      text: "指南",
      items: [
        // { text: "安装", link: mergePath("/guide/installation") },
        { text: "快速开始", link: mergePath("/guide/quickstart") },
      ],
    },
    { text: "更新日志", link: mergePath("/guide/updatelog") }
  ],
};
