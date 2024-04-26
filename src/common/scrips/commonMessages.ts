export type CommonMessagesType = {
  created: Date;
  good_id: string;
  title: string;
  message: string;
  read: boolean;
  user_id: string;
  users_id_massages: string;
};

export type Conversation = {
  receiverId: string;
  messages: CommonMessagesType[];
};
