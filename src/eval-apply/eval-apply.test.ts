import { IsExact, assert } from "conditional-type-checks";
import { Eval } from "./eval-apply";
import { Error } from "../utils/error";
import { NumberToNatural } from "../primitives/natural";
import { MakeCompoundProcedure, MakePrimitiveProcedure } from "./procedure";

type SampleWorld = {
  envs: [
    {
      variables: ["+", "var"];
      values: [MakePrimitiveProcedure<"+">, 123];
      enclosing_env: null;
    }
  ];
  current_env: 0;
};

// self-evaluating
assert<IsExact<Eval<null, SampleWorld>["value"], null>>(true);
assert<IsExact<Eval<true, SampleWorld>["value"], true>>(true);
assert<IsExact<Eval<123, SampleWorld>["value"], 123>>(true);
assert<
  IsExact<Eval<NumberToNatural<3>, SampleWorld>["value"], NumberToNatural<3>>
>(true);

// variable
assert<IsExact<Eval<"var", SampleWorld>["value"], 123>>(true);
assert<
  IsExact<
    Eval<"unknown", SampleWorld>["value"],
    Error<"Unbound variable: unknown">
  >
>(true);

// quote
assert<IsExact<Eval<["quote", 1], SampleWorld>["value"], 1>>(true);
assert<IsExact<Eval<["quote", "str"], SampleWorld>["value"], "str">>(true);

// define
assert<
  IsExact<
    Eval<
      ["begin", ["define", "a", ["quote", "a value"]], "a"],
      SampleWorld
    >["value"],
    "a value"
  >
>(true);
assert<
  IsExact<
    Eval<
      ["begin", ["define", ["proc", "arg1", "arg2"], "body1", "body2"], "proc"],
      SampleWorld
    >["value"],
    MakeCompoundProcedure<["arg1", "arg2"], ["body1", "body2"], 0>
  >
>(true);
assert<
  IsExact<
    Eval<["define", "var", ["quote", "a value"]], SampleWorld>["world"],
    Error<"variable already defined: var">
  >
>(true);

// if
assert<IsExact<Eval<["if", true, 1, 2], SampleWorld>["value"], 1>>(true);
assert<IsExact<Eval<["if", false, 1, 2], SampleWorld>["value"], 2>>(true);

// lambda
assert<IsExact<Eval<[["lambda", ["x"], "x"], 1], SampleWorld>["value"], 1>>(
  true
);

// cond
// prettier-ignore
assert<
  IsExact<
    Eval<
      ["cond",
        [true, 1, 2],
        [false, 3, 4]
      ],
      SampleWorld
    >["value"],
    2
  >
>(true);
// prettier-ignore
assert<
  IsExact<
    Eval<
      ["cond",
        [false, 1, 2],
        [true, 3, 4]
      ],
      SampleWorld
    >["value"],
    4
  >
>(true);
// prettier-ignore
assert<
  IsExact<
    Eval<
      ["cond",
        [false, 1, 2],
        [false, 3, 4],
        ["else", 5, 6]
      ],
      SampleWorld
    >["value"],
    6
  >
>(true);

// primitive procedure
assert<
  IsExact<
    Eval<["+", NumberToNatural<2>, NumberToNatural<3>], SampleWorld>["value"],
    NumberToNatural<5>
  >
>(true);
