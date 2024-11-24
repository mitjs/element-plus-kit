type ISlots = {
  header?: ((...args: any[]) => VNode | string | void) | string;
  default?: ((...args: any[]) => VNode | string | void) | string;
}

export type ColumnProps = {
  label: string;
  prop: string;
  children?: Array<ColumnProps>;
  slot?: ISlots;
  // render?: ((...args: any[]) => VNode | string | void) | string;
} & Indexable

export type IPageProps = {
  current: number;
  size: number;
  total: number;

  // render?: ((...args: any[]) => VNode | string | void) | string;
}
