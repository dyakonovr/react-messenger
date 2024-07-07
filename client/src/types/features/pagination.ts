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

export const getPaginationSchemaWithItemsAsObject = <ItemSchema extends ZodSchema>(
  objectSchema: ItemSchema
) => {
  return defaultPaginationSchema.extend({
    items: objectSchema
  });
};

export type PaginationType<ItemType> = z.infer<typeof defaultPaginationSchema> & {
  items: ItemType;
};
