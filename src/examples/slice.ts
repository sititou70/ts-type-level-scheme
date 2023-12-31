import { IsExact, assert } from "conditional-type-checks";
import { Scheme } from "..";

// https://github.com/type-challenges/type-challenges/blob/main/questions/00216-extreme-slice/README.md
type Slice<
  array extends unknown[],
  start extends number,
  end extends number
> = [
  "begin",

  [
    "define",
    ["slice", "array", "start", "end"],

    [
      "define",
      ["iter", "rest", "result", "idx"],

      [
        "if",
        ["null?", "rest"],
        "result",
        [
          "if",
          ["and", ["<=", "start", "idx"], ["<", "idx", "end"]],
          [
            "iter",
            ["cdr", "rest"],
            ["append", "result", ["list", ["car", "rest"]]],
            ["+", "idx", 1]
          ],
          ["iter", ["cdr", "rest"], "result", ["+", "idx", 1]]
        ]
      ]
    ],

    ["iter", "array", ["quote", []], 0]
  ],

  ["slice", ["quote", array], start, end]
];

assert<IsExact<Scheme<Slice<[1, 2, 3, 4, 5], 2, 4>>, [3, 4]>>(true);
assert<IsExact<Scheme<Slice<[1, 2, 3, 4, 5], 0, 3>>, [1, 2, 3]>>(true);
assert<IsExact<Scheme<Slice<[1, 2, 3, 4, 5], 0, 10>>, [1, 2, 3, 4, 5]>>(true);
assert<IsExact<Scheme<Slice<[1, 2, 3, 4, 5], 10, 10>>, []>>(true);
assert<IsExact<Scheme<Slice<[1, 2, 3, 4, 5], 0, 0>>, []>>(true);
assert<IsExact<Scheme<Slice<[1, 2, 3, 4, 5], 3, 3>>, []>>(true);
