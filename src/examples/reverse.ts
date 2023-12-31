import { IsExact, assert } from "conditional-type-checks";
import { Scheme } from "..";

// https://github.com/type-challenges/type-challenges/tree/main/questions/03192-medium-reverse
type Reverse<array extends unknown[]> = [
  "begin",

  [
    "define",
    ["reverse", "rest", "result"],

    [
      "if",
      ["null?", "rest"],
      "result",
      ["reverse", ["cdr", "rest"], ["cons", ["car", "rest"], "result"]]
    ]
  ],

  ["reverse", ["quote", array], ["quote", []]]
];

assert<IsExact<Scheme<Reverse<["a", "b"]>>, ["b", "a"]>>(true);
assert<IsExact<Scheme<Reverse<["a", "b", "c"]>>, ["c", "b", "a"]>>(true);
assert<IsExact<Scheme<Reverse<[1, 2, 3, 4, 5]>>, [5, 4, 3, 2, 1]>>(true);
