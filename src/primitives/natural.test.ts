import { IsExact, assert } from "conditional-type-checks";
import {
  Add,
  Div,
  LessThan,
  LessThanEq,
  Mod,
  MoreThan,
  MoreThanEq,
  Mul,
  NumberToNatural,
  Pred,
  Sub,
  Succ,
} from "./natural";

assert<IsExact<Succ<NumberToNatural<0>>, NumberToNatural<1>>>(true);
assert<IsExact<Succ<NumberToNatural<1>>, NumberToNatural<2>>>(true);
assert<IsExact<Succ<NumberToNatural<2>>, NumberToNatural<3>>>(true);

assert<IsExact<Pred<NumberToNatural<0>>, NumberToNatural<0>>>(true);
assert<IsExact<Pred<NumberToNatural<1>>, NumberToNatural<0>>>(true);
assert<IsExact<Pred<NumberToNatural<2>>, NumberToNatural<1>>>(true);
assert<IsExact<Pred<NumberToNatural<3>>, NumberToNatural<2>>>(true);

assert<
  IsExact<Add<NumberToNatural<2>, NumberToNatural<3>>, NumberToNatural<5>>
>(true);

assert<
  IsExact<Sub<NumberToNatural<5>, NumberToNatural<3>>, NumberToNatural<2>>
>(true);
assert<
  IsExact<Sub<NumberToNatural<3>, NumberToNatural<3>>, NumberToNatural<0>>
>(true);
assert<
  IsExact<Sub<NumberToNatural<3>, NumberToNatural<5>>, NumberToNatural<0>>
>(true);

assert<
  IsExact<Mul<NumberToNatural<3>, NumberToNatural<5>>, NumberToNatural<15>>
>(true);
assert<
  IsExact<Mul<NumberToNatural<3>, NumberToNatural<1>>, NumberToNatural<3>>
>(true);
assert<
  IsExact<Mul<NumberToNatural<10>, NumberToNatural<0>>, NumberToNatural<0>>
>(true);

assert<
  IsExact<Div<NumberToNatural<15>, NumberToNatural<3>>, NumberToNatural<5>>
>(true);
assert<
  IsExact<Div<NumberToNatural<5>, NumberToNatural<3>>, NumberToNatural<1>>
>(true);
assert<
  IsExact<Div<NumberToNatural<5>, NumberToNatural<15>>, NumberToNatural<0>>
>(true);

assert<
  IsExact<Mod<NumberToNatural<5>, NumberToNatural<3>>, NumberToNatural<2>>
>(true);
assert<
  IsExact<Mod<NumberToNatural<5>, NumberToNatural<15>>, NumberToNatural<5>>
>(true);
assert<
  IsExact<Mod<NumberToNatural<23>, NumberToNatural<7>>, NumberToNatural<2>>
>(true);

assert<IsExact<LessThan<NumberToNatural<3>, NumberToNatural<4>>, true>>(true);
assert<IsExact<LessThan<NumberToNatural<3>, NumberToNatural<3>>, false>>(true);
assert<IsExact<LessThan<NumberToNatural<4>, NumberToNatural<3>>, false>>(true);

assert<IsExact<LessThanEq<NumberToNatural<3>, NumberToNatural<4>>, true>>(true);
assert<IsExact<LessThanEq<NumberToNatural<3>, NumberToNatural<3>>, true>>(true);
assert<IsExact<LessThanEq<NumberToNatural<4>, NumberToNatural<3>>, false>>(
  true
);

assert<IsExact<MoreThan<NumberToNatural<3>, NumberToNatural<4>>, false>>(true);
assert<IsExact<MoreThan<NumberToNatural<3>, NumberToNatural<3>>, false>>(true);
assert<IsExact<MoreThan<NumberToNatural<4>, NumberToNatural<3>>, true>>(true);

assert<IsExact<MoreThanEq<NumberToNatural<3>, NumberToNatural<4>>, false>>(
  true
);
assert<IsExact<MoreThanEq<NumberToNatural<3>, NumberToNatural<3>>, true>>(true);
assert<IsExact<MoreThanEq<NumberToNatural<4>, NumberToNatural<3>>, true>>(true);
