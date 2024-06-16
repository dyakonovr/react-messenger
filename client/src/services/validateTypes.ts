// import type { ZodSchema } from "zod";

// export function validateTypes<T>(
//   schema: ZodSchema,
//   data: T,
//   errorCallback?: (...args: unknown[]) => void
// ) {
//   const validationResult = schema.safeParse(data);
//   if (!validationResult.success) {
//     if (errorCallback) return errorCallback();
//     throw new Error("Data is invalidate");
//   }

//   return validationResult.data as T;
// }

import type { ZodSchema } from "zod";
import type { Nullable } from "../types/general/nullable";

type Callback<Schema> = (error: Nullable<Error>, data: Nullable<Schema>) => void;
type Result<Schema> = { data: Schema, response: Response };

export async function validateTypes<Schema>(
  schema: ZodSchema<Schema>,
  response: Response,
  callback?: Callback<Schema>
): Promise<Result<Schema>> {
  try {
    const contentLength = response.headers.get("Content-Length");
    if (!contentLength || +contentLength === 0) throw new Error("Empty data");

    const result = schema.safeParse(await response.json());

    if (!result.success) {
      throw new Error("Data is invalidate");
    }

    if (callback) {
      callback(null, result.data);
    }
    return { data: result.data, response };
  } catch (error) {
    if (callback) {
      callback(error as Error, null);
    }
    throw error;
  }
}
