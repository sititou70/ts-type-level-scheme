import { IsExact, assert } from "conditional-type-checks";
import { Scheme } from "..";

type Fib1<n extends number> = [
  "begin",

  [
    "define",
    ["fib", "n"],

    [
      "cond",
      [["=", "n", 0], 0],
      [["=", "n", 1], 1],
      ["else", ["+", ["fib", ["-", "n", 1]], ["fib", ["-", "n", 2]]]]
    ]
  ],

  ["fib", n]
];

assert<IsExact<Scheme<Fib1<0>>, 0>>(true);
assert<IsExact<Scheme<Fib1<1>>, 1>>(true);
assert<IsExact<Scheme<Fib1<2>>, 1>>(true);
assert<IsExact<Scheme<Fib1<3>>, 2>>(true);
assert<IsExact<Scheme<Fib1<4>>, 3>>(true);
assert<IsExact<Scheme<Fib1<5>>, 5>>(true);
assert<IsExact<Scheme<Fib1<11>>, 89>>(true);
