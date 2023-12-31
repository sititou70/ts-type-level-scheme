import { IsExact } from "conditional-type-checks";
import { Cast } from "../utils/cast";
import { Error } from "../utils/error";
import {
  Add,
  Div,
  LessThan,
  LessThanEq,
  Mod,
  MoreThan,
  MoreThanEq,
  Mul,
  Natural,
  Sub,
} from "./natural";
import { Append, Car, Cdr, Cons, IsNull } from "./pair";

// todo: operandのエラー処理
export type ApplyPrimitiveProcedure<
  id extends string,
  operands extends unknown[]
> = id extends "+"
  ? Add<Cast<operands[0], Natural>, Cast<operands[1], Natural>>
  : id extends "-"
  ? Sub<Cast<operands[0], Natural>, Cast<operands[1], Natural>>
  : id extends "*"
  ? Mul<Cast<operands[0], Natural>, Cast<operands[1], Natural>>
  : id extends "/"
  ? Div<Cast<operands[0], Natural>, Cast<operands[1], Natural>>
  : id extends "remainder"
  ? Mod<Cast<operands[0], Natural>, Cast<operands[1], Natural>>
  : id extends "="
  ? IsExact<operands[0], operands[1]>
  : id extends "<"
  ? LessThan<Cast<operands[0], Natural>, Cast<operands[1], Natural>>
  : id extends "<="
  ? LessThanEq<Cast<operands[0], Natural>, Cast<operands[1], Natural>>
  : id extends ">"
  ? MoreThan<Cast<operands[0], Natural>, Cast<operands[1], Natural>>
  : id extends ">="
  ? MoreThanEq<Cast<operands[0], Natural>, Cast<operands[1], Natural>>
  : id extends "and"
  ? And<operands[0], operands[1]>
  : id extends "or"
  ? Or<operands[0], operands[1]>
  : id extends "null?"
  ? IsNull<operands[0]>
  : id extends "cons"
  ? Cons<operands[0], Cast<operands[1], unknown[]>>
  : id extends "car"
  ? Car<Cast<operands[0], unknown[]>>
  : id extends "cdr"
  ? Cdr<Cast<operands[0], unknown[]>>
  : id extends "list"
  ? operands
  : id extends "append"
  ? Append<Cast<operands[0], unknown[]>, Cast<operands[1], unknown[]>>
  : Error<"ApplyPrimitiveProcedure: unknown procedure">;

type And<x, y> = x extends true ? (y extends true ? true : false) : false;
type Or<x, y> = x extends false ? (y extends false ? false : true) : true;
