import { customFetch } from "./_core/fetch";
import { chatMessagesSchema } from "../types/features/chatMessages";
import { getPaginationSchemaWithItemsAsObject } from "../types/features/pagination";
import type { IPaginationOptions } from "../types/general/paginationOptions";
import { validateTypes } from "./_core/validateTypes";
import { createUrlParamsFromObject } from "./_core/createUrlParamsFromObject";

interface IOptions extends IPaginationOptions {
  chatId: string;
}

class DialogMessagesService {
  private url = "dialog-messages";

  getAll = async (options: IOptions) => {
    const params = createUrlParamsFromObject(options);
    const response = await customFetch(`${this.url}?${params}`, {
      cache: "no-store"
    });

    return validateTypes(
      getPaginationSchemaWithItemsAsObject(chatMessagesSchema),
      response
    );
  };
}

export default new DialogMessagesService();
