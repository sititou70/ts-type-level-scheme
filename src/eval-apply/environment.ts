import { Cast } from "../utils/cast";
import { Error } from "../utils/error";
import { ExtractResult } from "../utils/result_container";

export type Environment = {
  variables: string[];
  values: unknown[];
  enclosing_env: number | null; // 外側の環境へのポインタ（World["envs"]の添字）
};
export type World = {
  envs: Environment[];
  current_env: number; // 現在の環境へのポインタ（envsの添字）
};

export type ExtendEnvironment<
  vars extends Environment["variables"],
  vals extends Environment["values"],
  base_env extends number,
  world extends World
> = {
  envs: [
    ...world["envs"],
    { variables: vars; values: vals; enclosing_env: base_env }
  ];
  current_env: world["envs"]["length"];
};

export type SetCurrentEnv<env extends number, world extends World> = {
  envs: world["envs"];
  current_env: env;
};

export type LookupVariable<
  variable extends string,
  world extends World
> = ExtractResult<_LookupVariable1<variable, world, world["current_env"]>>;
type _LookupVariable1<
  variable extends string,
  world extends World,
  env_id extends number | null
> = env_id extends number
  ? {
      _: _LookupVariable2<
        variable,
        world,
        env_id,
        LookupVariableInEnvironment<variable, world["envs"][env_id]>
      >;
    }
  : Error<`Unbound variable: ${variable}`>;
type _LookupVariable2<
  variable extends string,
  world extends World,
  env_id extends number,
  lookup_in_environment_result
> = lookup_in_environment_result extends Error
  ? {
      _: _LookupVariable1<
        variable,
        world,
        world["envs"][env_id]["enclosing_env"]
      >;
    }
  : lookup_in_environment_result;

export type LookupVariableInEnvironment<
  variable extends string,
  env extends Environment
> = ExtractResult<
  _LookupVariableInEnvironment<variable, env["variables"], env["values"]>
>;
type _LookupVariableInEnvironment<
  variable extends string,
  vars extends Environment["variables"],
  vals extends Environment["values"]
> = vars extends [infer first_var, ...infer rest_vars]
  ? vals extends [infer first_val, ...infer rest_vals]
    ? first_var extends variable
      ? first_val
      : {
          _: _LookupVariableInEnvironment<
            variable,
            Cast<rest_vars, string[]>,
            rest_vals
          >;
        }
    : Error<`Unbound variable in environment: ${variable}`>
  : Error<`Unbound variable in environment: ${variable}`>;

export type DefineVariable<
  variable extends Environment["variables"][number],
  value extends Environment["values"][number],
  world extends World
> = LookupVariableInEnvironment<
  variable,
  world["envs"][world["current_env"]]
> extends Error
  ? {
      envs: ReplaceEnvironments<
        world["envs"],
        world["current_env"],
        [...world["envs"][world["current_env"]]["variables"], variable],
        [...world["envs"][world["current_env"]]["values"], value]
      >;
      current_env: world["current_env"];
    }
  : Error<`variable already defined: ${variable}`>;
type ReplaceEnvironments<
  envs extends Environment[],
  env_id extends number,
  variables extends Environment["variables"],
  values extends Environment["values"]
> = ExtractResult<_ReplaceEnvironments<envs, env_id, variables, values, []>>;
type _ReplaceEnvironments<
  envs extends Environment[],
  env_id extends number,
  variables extends Environment["variables"],
  values extends Environment["values"],
  result extends Environment[]
> = envs extends [infer first, ...infer rest]
  ? result["length"] extends env_id
    ? {
        _: _ReplaceEnvironments<
          Cast<rest, Environment[]>,
          env_id,
          variables,
          values,
          [
            ...result,
            {
              variables: variables;
              values: values;
              enclosing_env: Cast<first, Environment>["enclosing_env"];
            }
          ]
        >;
      }
    : {
        _: _ReplaceEnvironments<
          Cast<rest, Environment[]>,
          env_id,
          variables,
          values,
          [...result, Cast<first, Environment>]
        >;
      }
  : result;
