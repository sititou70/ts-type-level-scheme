import { IsExact, assert } from "conditional-type-checks";
import { Scheme } from "..";

type Fib2<n extends number> = [
  "begin",

  [
    "define",
    ["fib", "n"],

    [
      "define",
      ["iter", "a", "b", "cnt"],

      [
        "if",
        ["=", "cnt", 0],
        "b",
        ["iter", ["+", "a", "b"], "a", ["-", "cnt", 1]]
      ]
    ],

    ["iter", 1, 0, "n"]
  ],

  ["fib", n]
];

assert<IsExact<Scheme<Fib2<0>>, 0>>(true);
assert<IsExact<Scheme<Fib2<1>>, 1>>(true);
assert<IsExact<Scheme<Fib2<2>>, 1>>(true);
assert<IsExact<Scheme<Fib2<3>>, 2>>(true);
assert<IsExact<Scheme<Fib2<4>>, 3>>(true);
assert<IsExact<Scheme<Fib2<5>>, 5>>(true);
assert<IsExact<Scheme<Fib2<19>>, 4181>>(true);
