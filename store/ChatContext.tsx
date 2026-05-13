// store/ChatContext.tsx
import React, { createContext, useState, useContext } from 'react';

interface Message {
  id: string;
  text?: string;    // Qoraalku waa ikhtiyaari hadda
  image?: string;   // Sawirka isna waa ikhtiyaari
  type: 'text' | 'image'; // Nooca fariinta
  isMe: boolean;
  time: string;
}

const ChatContext = createContext<any>(null);

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: 'Asc Abdalla!', type: 'text', isMe: false, time: '10:00 AM' },
  ]);

  const sendMessage = (content: string, type: 'text' | 'image' = 'text') => {
    const newMessage: Message = {
      id: Math.random().toString(),
      [type === 'text' ? 'text' : 'image']: content,
      type: type,
      isMe: true,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  return (
    <ChatContext.Provider value={{ messages, sendMessage }}>
      {children}
    </ChatContext.Provider>
  );
}

export const useChat = () => useContext(ChatContext);
