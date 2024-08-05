export function createUrlParamsFromObject(obj: object) {
  const params = [];

  for (const key in obj) {
    if (!["string", "number", "symbol"].includes(typeof obj[key as keyof typeof obj]))
      continue;

    params.push(
      `${encodeURIComponent(key)}=${encodeURIComponent(obj[key as keyof typeof obj])}`
    );
  }

  return params.join("&");
}
