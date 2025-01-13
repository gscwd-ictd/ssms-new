// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const takeUniqueOrThrow = <T extends any[]>(values: T): T[number] => {
  if (values.length === 0) return { message: "Not found!" };
  return values[0]!;
};
