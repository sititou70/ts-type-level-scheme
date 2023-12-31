// see: https://kgtkr.net/blog/2019/04/15/typescript-typelevelprogramming-error-suppression
export type Cast<T, P> = T extends P ? T : P;
