import type { ZodSchema } from "zod";
import { z } from "zod";

const defaultPaginationSchema = z.object({
  currentPage: z.number(),
  totalPages: z.number()
});

export const getPaginationSchema = <ItemSchema extends ZodSchema>(
  itemSchema: ItemSchema
) => {
  return defaultPaginationSchema.extend({
    items: z.array(itemSchema)
  });
};

export type PaginationType<ItemType extends unknown[]> = z.infer<
  typeof defaultPaginationSchema
> & { items: ItemType };
