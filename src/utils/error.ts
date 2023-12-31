export type Error<reason extends string = string> = {
  type: "error";
  reason: reason;
};
