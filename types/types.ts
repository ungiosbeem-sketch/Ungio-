export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
}

export interface Message {
  id: string;
  text?: string;
  image?: string;
  type: 'text' | 'image';
  isMe: boolean;
  time: string;
  senderId: string;
}
