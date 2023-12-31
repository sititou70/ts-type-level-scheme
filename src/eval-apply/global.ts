import { MakePrimitiveProcedure } from "./procedure";

export type GlobalWorld = {
  envs: [
    {
      variables: [
        "+",
        "-",
        "*",
        "/",
        "remainder",
        "=",
        "<",
        "<=",
        ">",
        ">=",
        "and",
        "or",
        "null?",
        "cons",
        "car",
        "cdr",
        "list",
        "append"
      ];
      values: [
        MakePrimitiveProcedure<"+">,
        MakePrimitiveProcedure<"-">,
        MakePrimitiveProcedure<"*">,
        MakePrimitiveProcedure<"/">,
        MakePrimitiveProcedure<"remainder">,
        MakePrimitiveProcedure<"=">,
        MakePrimitiveProcedure<"<">,
        MakePrimitiveProcedure<"<=">,
        MakePrimitiveProcedure<">">,
        MakePrimitiveProcedure<">=">,
        MakePrimitiveProcedure<"and">,
        MakePrimitiveProcedure<"or">,
        MakePrimitiveProcedure<"null?">,
        MakePrimitiveProcedure<"cons">,
        MakePrimitiveProcedure<"car">,
        MakePrimitiveProcedure<"cdr">,
        MakePrimitiveProcedure<"list">,
        MakePrimitiveProcedure<"append">
      ];
      enclosing_env: null;
    }
  ];
  current_env: 0;
};
