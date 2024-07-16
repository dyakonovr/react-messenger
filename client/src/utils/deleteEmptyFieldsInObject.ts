function isPrimitive(value: unknown): boolean {
  return ["string", "number", "symbol", "bigint", "boolean"].includes(typeof value);
}

export function deleteEmptyFieldsInObjectNested<MyObject extends object>(
  obj: MyObject,
  unwantedValues: unknown[] = [undefined, null, ""]
): MyObject {
  const result = {} as MyObject;
  let key: keyof MyObject;

  for (key in obj) {
    const value = obj[key];

    if (Array.isArray(value)) {
      result[key] = value.filter((el) => {
        if (!isPrimitive(el)) return true;
        return !unwantedValues.includes(el);
      }) as MyObject[typeof key];
    } else if (typeof value === "object" && value !== null) {
      result[key] = deleteEmptyFieldsInObjectNested(
        value as object,
        unwantedValues
      ) as MyObject[typeof key];
    } else if (!unwantedValues.includes(value)) {
      // Добавление примитивных значений, не входящих в unwantedValues
      result[key] = value;
    }
  }

  return result;
}

export function deleteEmptyFieldsInObject<MyObject extends object>(
  obj: MyObject,
  unwantedValues: unknown[] = [undefined, null, ""]
): MyObject {
  const result = {} as MyObject;
  let key: keyof MyObject;

  for (key in obj) {
    const value = obj[key];

    if (isPrimitive(value) && unwantedValues.includes(value)) continue;
    result[key] = value;
  }

  return result;
}
