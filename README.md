# ts-type-level-scheme

Type-level Scheme interpreter in TypeScript.

[Playground](https://www.typescriptlang.org/play?#code/JYWwDg9gTgLgBDAnmApnA3nAygYwBYohoC+cAZlBCHAEQwDOAtEqowDYoBuKbj9+hFDQDcAKFEs0AMWAAjADwA7OCgAeMFIoAm9OIoCuIWSigA+OAF44AbVFxaxgObBFNADTj7t+-ZpaUZC5CHj42NIGy7rSuALoedj7eobQ4ENruCaHW1jQWUTSubnAADHElcZmJOXlFBVEAjGWNIck5PPTBYQDUUTkRvTSM+YVwjWV9cgNDtSMATDELMZVL9hUJE5FFiksxYhLIaBEA+sWW2AJE8jIKxaamYgD0Dz4AegD8+6jkckf1Z7gES7XeT1O6PZ72d6fQ4-Wb-C4oK5yeSzMGiJ6vD6Sb6yI4AZnhgMRwLxaIxkKxBxxRwALITBEiFDSyRC4FDsccAKz0oHIzkszHQ6kANh5xORwoFFNEQA)

```typescript
import type { Scheme } from "ts-type-level-scheme";

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

type reversed = Scheme<Reverse<[1, "a", true, null, undefined]>>;
//   ^? type reversed = [undefined, null, true, "a", 1]
```

```typescript
import type { Scheme } from "ts-type-level-scheme";

type Fib<n extends number> = [
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

type fib_0 = Scheme<Fib<0>>;
//   ^? type fib_0 = 0
type fib_1 = Scheme<Fib<1>>;
//   ^? type fib_1 = 1
type fib_2 = Scheme<Fib<2>>;
//   ^? type fib_2 = 1
type fib_3 = Scheme<Fib<3>>;
//   ^? type fib_3 = 2
type fib_4 = Scheme<Fib<4>>;
//   ^? type fib_4 = 3
type fib_5 = Scheme<Fib<5>>;
//   ^? type fib_5 = 5
type fib_6 = Scheme<Fib<6>>;
//   ^? type fib_6 = 8
```

[more examples](https://github.com/sititou70/ts-type-level-scheme/tree/master/src/examples)

## Limitations

- `set!`, `set-car!`, and `set-cdr!` are not implemented.
- Only the following special forms are available:
  - `quote`
  - `define`
  - `if`
  - `lambda`
  - `cond`
  - `begin`
- Only natural numbers including zero are supported for numbers.
- Due to the limitation of tsc, heavy computation will result in TS2589 error.
- Only the following primitive procedures can be used:
  - `+`
  - `-`
  - `*`
  - `/`
  - `remainder`
  - `=`
  - `<`
  - `<=`
  - `>`
  - `>=`
  - `and`
  - `or`
  - `null?`
  - `cons`
  - `car`
  - `cdr`
  - `list`
  - `append`

## License

MIT
