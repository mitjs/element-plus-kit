type Indexable<T = any> = { [key: string]: T }
type Numeric = number | string
type Nullable<T = any> = T | null
type Arrayable<T> = T | T[];