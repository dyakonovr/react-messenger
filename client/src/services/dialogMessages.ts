import { customFetch } from "./fetch";
import { chatMessagesSchema } from "../types/features/chatMessages";
import { getPaginationSchemaWithItemsAsObject } from "../types/features/pagination";
import type { IPaginationOptions } from "../types/general/paginationOptions";
import { validateTypes } from "./validateTypes";

class DialogMessagesService {
  private url = "dialog-messages";

  getAll = async (paginationOptions: IPaginationOptions & { chatId: string }) => {
    const response = await customFetch(
      `${this.url}?chatId=${paginationOptions.chatId}&page=${paginationOptions.page}&limit=${paginationOptions.limit}`,
      {
        cache: "no-store"
      }
    );

    return validateTypes(
      getPaginationSchemaWithItemsAsObject(chatMessagesSchema),
      response
    );
  };
}

export default new DialogMessagesService();
