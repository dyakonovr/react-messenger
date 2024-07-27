export interface ISendMessage {
  text: string;
  chatId: string;
}

export interface IReadMessage {
  messageIds: number[];
  chatId: number;
}
