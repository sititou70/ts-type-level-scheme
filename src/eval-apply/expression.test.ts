import { IsExact, assert } from "conditional-type-checks";
import { CondToIf, NormalizeDefine } from "./expression";

assert<IsExact<NormalizeDefine<["define", "a", 1]>, ["define", "a", 1]>>(true);
assert<
  IsExact<
    NormalizeDefine<["define", ["proc"], "body"]>,
    ["define", "proc", ["lambda", [], "body"]]
  >
>(true);
assert<
  IsExact<
    NormalizeDefine<["define", ["proc", "arg1", "arg2"], ["body1"], ["body2"]]>,
    ["define", "proc", ["lambda", ["arg1", "arg2"], ["body1"], ["body2"]]]
  >
>(true);

// prettier-ignore
assert<
  IsExact<
    CondToIf<
      ["cond",
        ["pred1", "act11", "act12"],
        ["pred2", "act21", "act22"]
      ]
    >,
    ["if", "pred1",
      ["begin", "act11", "act12"],
      ["if", "pred2",
        ["begin", "act21", "act22"],
        false
      ]
    ]
  >
>(true);
// prettier-ignore
assert<
  IsExact<
    CondToIf<
      ["cond",
        ["pred1", "act11", "act12"],
        ["pred2", "act21", "act22"],
        ["else", "act31", "act32"]
      ]
    >,
    ["if", "pred1",
      ["begin", "act11", "act12"],
      ["if", "pred2",
        ["begin", "act21", "act22"],
        ["begin", "act31", "act32"]
      ]
    ]
  >
>(true);
