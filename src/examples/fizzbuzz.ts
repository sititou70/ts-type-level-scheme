import { IsExact, assert } from "conditional-type-checks";
import { Scheme } from "..";

type FizzBuzzArray<n extends number> = [
  "begin",

  [
    "define",
    ["fizzbuzz-array", "n"],

    [
      "define",
      ["fizzbuzz", "n"],

      [
        "cond",
        [["=", ["remainder", "n", 15], 0], ["quote", "Fizz Buzz"]],
        [["=", ["remainder", "n", 3], 0], ["quote", "Fizz"]],
        [["=", ["remainder", "n", 5], 0], ["quote", "Buzz"]],
        ["else", "n"]
      ]
    ],

    [
      "define",
      ["iter", "n", "result"],

      [
        "if",
        ["=", "n", 0],
        "result",
        ["iter", ["-", "n", 1], ["cons", ["fizzbuzz", "n"], "result"]]
      ]
    ],

    ["iter", "n", ["quote", []]]
  ],

  ["fizzbuzz-array", n]
];

assert<
  IsExact<
    Scheme<FizzBuzzArray<30>>,
    [
      1,
      2,
      "Fizz",
      4,
      "Buzz",
      "Fizz",
      7,
      8,
      "Fizz",
      "Buzz",
      11,
      "Fizz",
      13,
      14,
      "Fizz Buzz",
      16,
      17,
      "Fizz",
      19,
      "Buzz",
      "Fizz",
      22,
      23,
      "Fizz",
      "Buzz",
      26,
      "Fizz",
      28,
      29,
      "Fizz Buzz"
    ]
  >
>(true);
