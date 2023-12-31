import { IsExact, assert } from "conditional-type-checks";
import { Parse } from "./parser";
import { NumberToNatural } from "../primitives/natural";

assert<IsExact<Parse<true>, true>>(true);

assert<IsExact<Parse<false>, false>>(true);

assert<IsExact<Parse<"string">, "string">>(true);

assert<IsExact<Parse<3>, NumberToNatural<3>>>(true);

assert<IsExact<Parse<[3]>, [NumberToNatural<3>]>>(true);

assert<
  IsExact<
    Parse<["123", true, false, 123, [1, 2, 3, [4, 5, 6]]]>,
    [
      "123",
      true,
      false,
      NumberToNatural<123>,
      [
        NumberToNatural<1>,
        NumberToNatural<2>,
        NumberToNatural<3>,
        [NumberToNatural<4>, NumberToNatural<5>, NumberToNatural<6>]
      ]
    ]
  >
>(true);
