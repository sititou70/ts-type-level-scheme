import { Natural } from "../primitives/natural";
import { ApplyPrimitiveProcedure } from "../primitives/primitive_procedures";
import { Cast } from "../utils/cast";
import { Error } from "../utils/error";
import { ExtractResult } from "../utils/result_container";
import {
  DefineVariable,
  ExtendEnvironment,
  LookupVariable,
  SetCurrentEnv,
  World,
} from "./environment";
import { CondToIf, NormalizeDefine } from "./expression";
import {
  CompoundProcedure,
  MakeCompoundProcedure,
  PrimitiveProcedure,
} from "./procedure";

export type EvalResult<
  value = unknown,
  world extends World | Error = World | Error
> = {
  value: value;
  world: world;
};
export type Eval<code, world extends World | Error> = code extends Error
  ? // code error
    EvalResult<code, world>
  : world extends Error
  ? // world error
    EvalResult<code, world>
  : code extends null | boolean | Natural | number
  ? // self-evaluating
    EvalResult<code, world>
  : code extends string
  ? // variable
    EvalResult<LookupVariable<code, Cast<world, World>>, world>
  : code extends ["quote", infer body]
  ? // quote
    EvalResult<body, world>
  : code extends ["define", ...infer _]
  ? // define
    EvalDefine<code, Cast<world, World>>
  : code extends ["if", infer pred, infer then_value, infer else_value]
  ? // if
    EvalIf<pred, then_value, else_value, Cast<world, World>>
  : code extends ["lambda", infer args, ...infer body]
  ? // lambda
    EvalResult<
      MakeCompoundProcedure<args, body, Cast<world, World>["current_env"]>,
      world
    >
  : code extends ["cond", ...infer _]
  ? // cond
    Eval<CondToIf<code>, world>
  : code extends ["begin", ...infer body]
  ? // begin
    EvalSequence<body, Cast<world, World>>
  : code extends [infer _, ...infer __]
  ? // application
    Apply<code, Cast<world, World>>
  : EvalResult<Error<"Eval: unknown expression type">, world>;

type EvalDefine<code, world extends World> = _EvalDefine1<
  Cast<NormalizeDefine<code>, unknown[]>,
  world
>;
type _EvalDefine1<
  code extends unknown[],
  world extends World
> = code extends Error
  ? EvalResult<code, world>
  : code[1] extends string
  ? _EvalDefine2<
      Cast<Cast<code, unknown[]>[1], string>,
      Eval<Cast<code, unknown[]>[2], world>["value"],
      world
    >
  : Error<"EvalDefine: define name must be a string">;
type _EvalDefine2<
  variable extends string,
  value,
  world extends World
> = value extends Error
  ? EvalResult<value, world>
  : EvalResult<null, DefineVariable<variable, value, world>>;

type EvalIf<pred, then_value, else_value, world extends World> = _EvalIf<
  Eval<pred, world> extends infer A ? Cast<A, EvalResult> : never,
  then_value,
  else_value,
  world
>;
type _EvalIf<
  pred_result extends EvalResult,
  then_value,
  else_value,
  world extends World
> = pred_result["value"] extends Error
  ? EvalResult<pred_result, world>
  : pred_result["value"] extends true
  ? Eval<then_value, world>
  : Eval<else_value, world>;

type EvalSequence<seq extends unknown[], world extends World> = ExtractResult<
  _EvalSequence<seq, world>
>;
type _EvalSequence<
  seq extends unknown[],
  world extends World | Error
> = seq extends [infer first, ...infer rest]
  ? rest extends []
    ? Eval<first, world>
    : {
        _: _EvalSequence<
          rest,
          (Eval<first, world> extends infer A
            ? Cast<A, EvalResult>
            : never)["world"]
        >;
      }
  : EvalResult<false, world>;

type EvalListOfValues<
  list extends unknown[],
  world extends World
> = ExtractResult<_EvalListOfValues1<list, world, []>>;
type _EvalListOfValues1<
  list extends unknown[],
  world extends World,
  result_values extends unknown[]
> = list extends [infer first, ...infer rest]
  ? {
      _: _EvalListOfValues2<
        rest,
        Eval<first, world> extends infer A ? Cast<A, EvalResult> : never,
        world,
        result_values
      >;
    }
  : { _: EvalResult<result_values, world> };
type _EvalListOfValues2<
  list extends unknown[],
  eval_result extends EvalResult,
  world extends World,
  result_values extends unknown[]
> = eval_result["value"] extends Error
  ? eval_result
  : eval_result["world"] extends Error
  ? eval_result
  : {
      _: _EvalListOfValues1<
        list,
        SetCurrentEnv<world["current_env"], Cast<eval_result["world"], World>>,
        [...result_values, eval_result["value"]]
      >;
    };

type Apply<code extends unknown[], world extends World> = _Apply1<
  EvalListOfValues<code, world>
>;
type _Apply1<list_of_values extends EvalResult> =
  list_of_values["value"] extends Error
    ? list_of_values
    : list_of_values["world"] extends Error
    ? list_of_values
    : list_of_values["value"] extends [infer operator, ...infer operand]
    ? _Apply2<operator, operand, Cast<list_of_values["world"], World>>
    : EvalResult<
        Error<"Apply: invalid application syntax">,
        list_of_values["world"]
      >;
type _Apply2<
  operator,
  operand extends unknown[],
  world extends World
> = operator extends CompoundProcedure
  ? EvalSequence<
      operator["body"],
      ExtendEnvironment<operator["args"], operand, operator["env"], world>
    >
  : operator extends PrimitiveProcedure
  ? EvalResult<ApplyPrimitiveProcedure<operator["id"], operand>, world>
  : EvalResult<Error<"Apply: unknown procedure type">, world>;
