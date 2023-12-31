import { IsExact, assert } from "conditional-type-checks";
import { Scheme } from "..";

assert<IsExact<Scheme<"foo">, "Unbound variable: foo">>(true);

assert<
  IsExact<
    Scheme<["begin", ["define", "a", 1], ["define", "a", 2]]>,
    "variable already defined: a"
  >
>(true);

assert<IsExact<Scheme<undefined>, "Eval: unknown expression type">>(true);

assert<
  IsExact<
    Scheme<["begin", ["define", "a", 1], ["a"]]>,
    "Apply: unknown procedure type"
  >
>(true);

assert<IsExact<Scheme<["cond"]>, "CondToIf: clauses are required">>(true);
