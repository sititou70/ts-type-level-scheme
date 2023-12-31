import { Cast } from "../utils/cast";
import { Error } from "../utils/error";
import { ExtractResult } from "../utils/result_container";

// (define (proc arg1 arg2) body) -> (define proc (lambda (arg1 arg2) body))
export type NormalizeDefine<code> = code extends unknown[]
  ? code[1] extends unknown[]
    ? code extends ["define", infer signature, ...infer body]
      ? signature extends [infer proc_name, ...infer args]
        ? ["define", proc_name, ["lambda", args, ...body]]
        : Error<"NormalizeDefine: invalid signature syntax">
      : Error<"NormalizeDefine: invalid procedure definition syntax">
    : code
  : Error<"NormalizeDefine: code must be an array">;

// (cond (pred1 ...action1) (pred2 ...action2)) -> (if pred1 (begin ...action1) (if pred2 (begin ...action2) false))
// (cond (pred1 ...action1) (pred2 ...action2) (else ...else_action)) -> (if pred1 (begin ...action1) (if pred2 (begin ...action2) (begin ...else_action)))
export type CondToIf<code> = code extends ["cond", ...unknown[][]]
  ? code extends ["cond", ...infer clauses, infer last_clause]
    ? last_clause extends ["else", ...infer else_action]
      ? ExtractResult<
          _CondToIf<Cast<clauses, unknown[][]>, ["begin", ...else_action]>
        >
      : ExtractResult<
          _CondToIf<Cast<[...clauses, last_clause], unknown[][]>, false>
        >
    : Error<"CondToIf: clauses are required">
  : Error<"CondToIf: invalid syntax">;
type _CondToIf<
  clauses extends unknown[][],
  result_code extends unknown
> = clauses extends [...infer rest_clauses, infer clause]
  ? clause extends [infer pred, ...infer action]
    ? {
        _: _CondToIf<
          Cast<rest_clauses, unknown[][]>,
          ["if", pred, ["begin", ...action], result_code]
        >;
      }
    : Error<"CondToIf: invalid clause syntax">
  : result_code;
