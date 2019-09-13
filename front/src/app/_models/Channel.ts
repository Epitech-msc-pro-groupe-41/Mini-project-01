export class Message {
  username: string;
  message: string;
}

export class Channel {
  _id: string;
  name: string;
  messages: Message[];
}
