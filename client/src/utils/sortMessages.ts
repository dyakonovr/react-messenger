import { IMessage } from "../interfaces/IMessage";

export function sortMessages(messages: IMessage[]) {
  console.log(messages);
  return messages.sort((messageA, messageB) => {
    if (messageA.createdAt > messageB.createdAt) return 1;
    if (messageA.createdAt < messageB.createdAt) return -1;
    return 0;
  });
}