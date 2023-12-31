import { Eval, EvalResult } from "./eval-apply/eval-apply";
import { GlobalWorld } from "./eval-apply/global";
import { Parse } from "./io/parser";
import { Print } from "./io/printer";
import { Cast } from "./utils/cast";
import { Error } from "./utils/error";

export type Scheme<code> = _Scheme<
  Eval<Parse<code>, GlobalWorld> extends infer A ? Cast<A, EvalResult> : never
>;
type _Scheme<eval_result extends EvalResult> =
  eval_result["value"] extends Error
    ? eval_result["value"]["reason"]
    : eval_result["world"] extends Error
    ? eval_result["world"]["reason"]
    : Print<eval_result["value"]>;
