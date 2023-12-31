import { Error } from "../utils/error";

export type IsNull<list> = list extends [] ? true : false;

export type Cons<car, cdr extends unknown[]> = [car, ...cdr];
export type Car<list extends unknown[]> = list extends [infer car, ...infer _]
  ? car
  : Error<"Car: invalid argument">;
export type Cdr<list extends unknown[]> = list extends [infer _, ...infer cdr]
  ? cdr
  : Error<"Cdr: invalid argument">;

export type Append<l1 extends unknown[], l2 extends unknown[]> = [...l1, ...l2];
