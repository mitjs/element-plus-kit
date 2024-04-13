interface ISlots {
  header?: ((...args: any[]) => VNode | string | void) | string;
  default?: ((...args: any[]) => VNode | string | void) | string;
}

export interface ColumnProps {
  label: string;
  prop: string;
  children?: Array<ColumnProps>;
  slot?: ISlots;
  // render?: ((...args: any[]) => VNode | string | void) | string;
}

export interface IPageProps {
  current: number;
  size: number;

  // render?: ((...args: any[]) => VNode | string | void) | string;
}
