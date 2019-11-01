type Maybe<T> = T | null | undefined;
type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;
type Keys<T extends object> = Array<(keyof T)>;

interface IStringDict {
  [key: string]: string
}

interface IBoolDict {
  [key: string]: Maybe<boolean>
}

interface IObjectDict<T> {
  [key: string]: Maybe<T>
}
