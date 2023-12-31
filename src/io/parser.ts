import { NumberToNatural } from "../primitives/natural";
import { ExtractResult } from "../utils/result_container";

export type Parse<code> = ExtractResult<_Parse<code>>;
type _Parse<code> = code extends unknown[]
  ? { _: _ParseArray<code, []> }
  : code extends number
  ? { _: _ParseNumber<code> }
  : code;
type _ParseArray<
  array extends unknown[],
  result extends unknown[]
> = array extends [infer first, ...infer rest]
  ? { _: _ParseArray<rest, [...result, Parse<first>]> }
  : result;
type _ParseNumber<val> = val extends number ? { _: NumberToNatural<val> } : val;
