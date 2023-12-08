import {
  Search,
  Refresh,
  CircleClose,
  CircleCheck,
} from "@element-plus/icons-vue";
import type { BtnType } from "./types.d.ts";

// 按钮文案
export const btnsRow: { [K in BtnType]: string } = {
  search: "查询",
  reset: "重置",
  cancel: "取消",
  submit: "提交",
};
/* 按钮icon */
export const BtnsIconRow: { [K in BtnType]: any } = {
  search: Search,
  reset: Refresh,
  cancel: CircleClose,
  submit: CircleCheck,
};
