import { customFetch } from "./_core/fetch";
import { dialogItemsSchema } from "../types/features/dialog";
import { getPaginationSchemaWithItemsAsObject } from "../types/features/pagination";
import type { IRequestFilters } from "../types/general/paginationOptions";
import { validateTypes } from "./_core/validateTypes";
import { createUrlParamsFromObject } from "./_core/createUrlParamsFromObject";

class DialogsService {
  private url = "dialogs";

  getAll = async (requestFilters: IRequestFilters) => {
    const params = createUrlParamsFromObject(requestFilters);
    const response = await customFetch(`${this.url}?${params}`, {
      cache: "no-store"
    });

    return validateTypes(
      getPaginationSchemaWithItemsAsObject(dialogItemsSchema),
      response
    );
  };
}

export default new DialogsService();
