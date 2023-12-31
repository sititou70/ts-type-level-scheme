import { IsExact, assert } from "conditional-type-checks";
import { Parse } from "./parser";
import { NumberToNatural } from "../primitives/natural";
import { Print } from "./printer";

assert<IsExact<Print<true>, true>>(true);

assert<IsExact<Print<false>, false>>(true);

assert<IsExact<Print<"string">, "string">>(true);

assert<IsExact<Print<NumberToNatural<3>>, 3>>(true);

assert<IsExact<Print<[NumberToNatural<3>]>, [3]>>(true);

assert<
  IsExact<
    Print<
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
    >,
    ["123", true, false, 123, [1, 2, 3, [4, 5, 6]]]
  >
>(true);
