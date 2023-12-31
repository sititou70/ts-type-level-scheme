import { Natural, NaturalToNumber } from "../primitives/natural";
import { ExtractResult } from "../utils/result_container";

export type Print<code> = ExtractResult<_Print<code>>;
type _Print<code> = code extends unknown[]
  ? { _: _PrintArray<code, []> }
  : code extends Natural
  ? { _: _PrintNumber<code> }
  : code;
type _PrintArray<
  array extends unknown[],
  result extends unknown[]
> = array extends [infer first, ...infer rest]
  ? { _: _PrintArray<rest, [...result, Print<first>]> }
  : result;
type _PrintNumber<val> = val extends Natural
  ? { _: NaturalToNumber<val> }
  : val;
