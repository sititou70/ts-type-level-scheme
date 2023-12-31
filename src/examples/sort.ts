import { IsExact, assert } from "conditional-type-checks";
import { Scheme } from "..";

// https://github.com/type-challenges/type-challenges/blob/main/questions/00741-extreme-sort/README.md
type Sort<array extends unknown[], desc extends boolean = false> = [
  "begin",

  [
    "define",
    ["sort", "array", "desc"],

    [
      "define",
      ["insert", "array", "val"],

      [
        "define",
        ["iter", "rest", "result"],

        [
          "cond",
          [["null?", "rest"], ["append", "result", ["list", "val"]]],
          [
            [["if", "desc", ">", "<"], "val", ["car", "rest"]],
            ["append", ["append", "result", ["list", "val"]], "rest"]
          ],
          [
            "else",
            [
              "iter",
              ["cdr", "rest"],
              ["append", "result", ["list", ["car", "rest"]]]
            ]
          ]
        ]
      ],

      ["iter", "array", ["quote", []]]
    ],

    [
      "define",
      ["iter", "rest", "result"],

      [
        "if",
        ["null?", "rest"],
        "result",
        ["iter", ["cdr", "rest"], ["insert", "result", ["car", "rest"]]]
      ]
    ],

    ["iter", "array", ["quote", []]]
  ],

  ["sort", ["quote", array], desc]
];

assert<IsExact<Scheme<Sort<[]>>, []>>(true);
assert<IsExact<Scheme<Sort<[1]>>, [1]>>(true);
assert<
  IsExact<
    Scheme<Sort<[2, 4, 7, 6, 6, 6, 5, 8, 9]>>,
    [2, 4, 5, 6, 6, 6, 7, 8, 9]
  >
>(true);
assert<IsExact<Scheme<Sort<[3, 2, 1], true>>, [3, 2, 1]>>(true);
assert<
  IsExact<Scheme<Sort<[3, 2, 0, 1, 0, 0, 0], true>>, [3, 2, 1, 0, 0, 0, 0]>
>(true);
