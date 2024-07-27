import { customFetch } from "./_core/fetch";
import { dialogItemsSchema } from "../types/features/dialog";
import { getPaginationSchemaWithItemsAsObject } from "../types/features/pagination";
import type { IRequestFilters } from "../types/general/paginationOptions";
import { validateTypes } from "./_core/validateTypes";

class DialogsService {
  private url = "dialogs";

  getAll = async (requestFilters: IRequestFilters) => {
    const response = await customFetch(
      `${this.url}?page=${requestFilters.page}&limit=${requestFilters.limit}&searchTerm=${requestFilters.searchTerm}`,
      {
        cache: "no-store"
      }
    );

    return validateTypes(
      getPaginationSchemaWithItemsAsObject(dialogItemsSchema),
      response
    );
  };
}

export default new DialogsService();
