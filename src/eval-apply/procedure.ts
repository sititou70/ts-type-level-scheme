import { Error } from "../utils/error";

export type CompoundProcedure = {
  type: "compound_procedure";
  args: string[];
  body: unknown[];
  env: number;
};
export type MakeCompoundProcedure<
  args,
  body extends unknown[],
  env extends number
> = args extends string[]
  ? {
      type: CompoundProcedure["type"];
      args: args;
      body: body;
      env: env;
    }
  : Error<"MakeProcedure: args must be a string array">;

export type PrimitiveProcedure = {
  type: "primitive_procedure";
  id: string;
};
export type MakePrimitiveProcedure<id extends string> = {
  type: PrimitiveProcedure["type"];
  id: id;
};
