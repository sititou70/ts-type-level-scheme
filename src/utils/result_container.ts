export type ResultContainer<T> = { _: T };

export type ExtractResult<container> = container extends { _: unknown }
  ? ExtractResult<_ExtractResult<container>>
  : container;
export type _ExtractResult<container> = container extends {
  _: { _: infer container };
}
  ? { _: _ExtractResult<container> }
  : container extends { _: infer contents }
  ? contents
  : container;
