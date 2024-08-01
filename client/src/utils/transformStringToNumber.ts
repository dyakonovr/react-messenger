export function transformStringToNumber(str: string): number {
  if (isNaN(+str)) throw new Error(`String '${str}' is not a number`);
  return +str;
}
