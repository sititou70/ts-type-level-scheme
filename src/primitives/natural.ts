import { Cast } from "../utils/cast";
import { ExtractResult } from "../utils/result_container";

export type Natural = { type: "internal_natural"; value: 1[] };
export type MakeNatural<value extends Natural["value"]> = {
  type: "internal_natural";
  value: value;
};

export type Zero = MakeNatural<[]>;

// utils
export type NumberToNatural<n extends number> = Cast<
  ExtractResult<_NumberToNatural<Zero, n>>,
  Natural
>;
type _NumberToNatural<
  nat extends Natural,
  num extends number
> = nat["value"]["length"] extends num
  ? nat
  : { _: _NumberToNatural<Succ<nat>, num> };

export type NaturalToNumber<n extends Natural> = n["value"]["length"];

// operators
export type Succ<n extends Natural> = MakeNatural<[...n["value"], 1]>;
export type Pred<n extends Natural> = n["value"] extends [1, ...infer rest]
  ? MakeNatural<Cast<rest, Natural["value"]>>
  : Zero;

export type Add<n1 extends Natural, n2 extends Natural> = MakeNatural<
  [...n1["value"], ...n2["value"]]
>;

export type Sub<n1 extends Natural, n2 extends Natural> = ExtractResult<
  _Sub<n1, n2>
>;
type _Sub<n1 extends Natural, n2 extends Natural> = n2 extends Zero
  ? n1
  : { _: _Sub<Pred<n1>, Pred<n2>> };

export type Mul<n1 extends Natural, n2 extends Natural> = ExtractResult<
  _Mul<Zero, n2, n1>
>;
type _Mul<
  result extends Natural,
  n2 extends Natural,
  n1 extends Natural
> = n2 extends Zero ? result : { _: _Mul<Add<result, n1>, Pred<n2>, n1> };

type DivAndModResult = { div: Natural; mod: Natural };
type DivAndMod<n1 extends Natural, n2 extends Natural> = ExtractResult<
  _DivAndMod<n1, n2, Zero>
>;
type _DivAndMod<
  n1 extends Natural,
  n2 extends Natural,
  sub_count extends Natural
> = Eq<n1, n2> extends true
  ? { div: Succ<sub_count>; mod: Zero }
  : LessThan<n1, n2> extends true
  ? { div: sub_count; mod: n1 }
  : { _: _DivAndMod<Cast<Sub<n1, n2>, Natural>, n2, Succ<sub_count>> };

export type Div<n1 extends Natural, n2 extends Natural> = Cast<
  DivAndMod<n1, n2>,
  DivAndModResult
>["div"];
export type Mod<n1 extends Natural, n2 extends Natural> = Cast<
  DivAndMod<n1, n2>,
  DivAndModResult
>["mod"];

type Eq<n1 extends Natural, n2 extends Natural> = n1 extends n2 ? true : false;

export type LessThan<n1 extends Natural, n2 extends Natural> = Eq<
  n1,
  n2
> extends true
  ? false
  : Sub<n1, n2> extends Zero
  ? true
  : false;
export type LessThanEq<n1 extends Natural, n2 extends Natural> = Eq<
  n1,
  n2
> extends true
  ? true
  : Sub<n1, n2> extends Zero
  ? true
  : false;

export type MoreThan<n1 extends Natural, n2 extends Natural> = Eq<
  n1,
  n2
> extends true
  ? false
  : Sub<n2, n1> extends Zero
  ? true
  : false;
export type MoreThanEq<n1 extends Natural, n2 extends Natural> = Eq<
  n1,
  n2
> extends true
  ? true
  : Sub<n2, n1> extends Zero
  ? true
  : false;
