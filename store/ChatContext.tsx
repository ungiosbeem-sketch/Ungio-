// store/ChatContext.tsx
import React, { createContext, useState, useContext } from 'react';

// Qeexidda qaabka fariintu u ekaanayso
interface Message {
  id: string;
  text: string;
  isMe: boolean;
  time: string;
}

const ChatContext = createContext<any>(null);

export function ChatProvider({ children }: { children: React.ReactNode }) {
  // Waxaan ku bilaabaynaa fariimo tusaale ah
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: 'Asc Abdalla! Sidee tahay?', isMe: false, time: '10:00 AM' },
    { id: '2', text: 'Walaal app-kii ma dhamaysay?', isMe: false, time: '10:05 AM' },
  ]);

  // Function fariin cusub lagu darayo
  const sendMessage = (text: string) => {
    if (text.trim() === '') return;

    const newMessage: Message = {
      id: Math.random().toString(), // Aqoonsi gaar ah
      text: text,
      isMe: true,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  return (
    <ChatContext.Provider value={{ messages, sendMessage }}>
      {children}
    </ChatContext.Provider>
  );
}

export const useChat = () => useContext(ChatContext);
