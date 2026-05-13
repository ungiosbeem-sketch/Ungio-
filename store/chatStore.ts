// store/chatStore.ts
import { create } from 'zustand';

interface Message {
  id: string;
  text: string;
  isMe: boolean;
  time: string;
}

interface ChatState {
  messages: Message[];
  addMessage: (text: string) => void;
}

export const useChatStore = create<ChatState>((set) => ({
  messages: [
    { id: '1', text: 'Ku soo dhawaaw chat-ka!', isMe: false, time: '12:00 PM' }
  ],

  addMessage: (text: string) => set((state) => ({
    messages: [
      ...state.messages,
      {
        id: Math.random().toString(), // Aqoonsi ku meel gaar ah
        text,
        isMe: true,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }
    ]
  })),
}));
