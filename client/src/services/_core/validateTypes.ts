import { z, type ZodSchema } from "zod";
import type { Nullable } from "../../types/general/nullable";

const errorSchema = z.object({
  message: z.union([z.array(z.string()), z.string()]),
  error: z.string(),
  statusCode: z.number()
});

export type ErrorSchema = z.infer<typeof errorSchema>;

type Result<Schema> = {
  data: Nullable<Schema>;
  error: Nullable<ErrorSchema>;
  response: Response;
};

export async function validateTypes<Schema>(
  schema: ZodSchema<Schema>,
  // errorSchema: ZodSchema<ErrorSchema>,
  response: Response
): Promise<Result<Schema>> {
  try {
    if (!response.ok) {
      const error = await response.json();
      const errorResult = errorSchema.safeParse(error);
      if (!errorResult.success) {
        throw new Error("Unexpected error");
      }

      return { data: null, error: errorResult.data, response };
    }

    const contentLength = response.headers.get("Content-Length");
    if (!contentLength || +contentLength === 0) throw new Error("Empty data");

    const result = schema.safeParse(await response.json());

    if (!result.success) {
      throw new Error(`Data is invalidate: ${result.error}`);
    }

    return { data: result.data, error: null, response };
  } catch (error) {
    console.log(error);
    return {
      data: null,
      error: {
        message: [(error as Error).message],
        error: "Unexpected error",
        statusCode: -1
      },
      response
    };
  }
}
