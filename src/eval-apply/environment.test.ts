import { IsExact, assert } from "conditional-type-checks";
import { Error } from "../utils/error";
import {
  DefineVariable,
  ExtendEnvironment,
  LookupVariable,
} from "./environment";

type SampleWorld = {
  envs: [
    { variables: ["a", "d", "e"]; values: [4, 5, 6]; enclosing_env: null },
    { variables: ["a", "b", "c"]; values: [1, 2, 3]; enclosing_env: 0 },
    { variables: []; values: []; enclosing_env: 0 }
  ];
  current_env: 1;
};

assert<
  IsExact<
    ExtendEnvironment<["var"], ["val"], 1, SampleWorld>,
    {
      envs: [
        {
          variables: ["a", "d", "e"];
          values: [4, 5, 6];
          enclosing_env: null;
        },
        { variables: ["a", "b", "c"]; values: [1, 2, 3]; enclosing_env: 0 },
        { variables: []; values: []; enclosing_env: 0 },
        { variables: ["var"]; values: ["val"]; enclosing_env: 1 }
      ];
      current_env: 3;
    }
  >
>(true);

assert<IsExact<LookupVariable<"a", SampleWorld>, 1>>(true);
assert<IsExact<LookupVariable<"b", SampleWorld>, 2>>(true);
assert<IsExact<LookupVariable<"c", SampleWorld>, 3>>(true);
assert<IsExact<LookupVariable<"d", SampleWorld>, 5>>(true);
assert<IsExact<LookupVariable<"e", SampleWorld>, 6>>(true);
assert<IsExact<LookupVariable<"f", SampleWorld>, Error<"Unbound variable: f">>>(
  true
);

assert<
  IsExact<
    DefineVariable<"var", 123, SampleWorld>,
    {
      envs: [
        {
          variables: ["a", "d", "e"];
          values: [4, 5, 6];
          enclosing_env: null;
        },
        {
          variables: ["a", "b", "c", "var"];
          values: [1, 2, 3, 123];
          enclosing_env: 0;
        },
        { variables: []; values: []; enclosing_env: 0 }
      ];
      current_env: 1;
    }
  >
>(true);
assert<
  IsExact<
    DefineVariable<"b", 123, SampleWorld>,
    Error<"variable already defined: b">
  >
>(true);
