export function transformStringToNumber(str: string): number {
  return isNaN(+str) ? 0 : +str;
}
