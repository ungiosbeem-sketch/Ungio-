// store/ChatContext.tsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import { supabase } from '../lib/supabase'; // Hubi in faylkani jiro

const ChatContext = createContext<any>(null);

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [messages, setMessages] = useState<any[]>([]);

  // 1. Soo akhrinta fariimaha (Fetch)
  const fetchMessages = async () => {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .order('created_at', { ascending: true });
    
    if (!error && data) setMessages(data);
  };

  useEffect(() => {
    fetchMessages();

    // 2. Real-time Listen (In fariinta isla markaaba soo dhacdo)
    const subscription = supabase
      .channel('public:messages')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, (payload) => {
        setMessages((prev) => [...prev, payload.new]);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  // 3. Dirista fariinta dhabta ah
  const sendMessage = async (content: string, type: 'text' | 'image' = 'text') => {
    const { error } = await supabase
      .from('messages')
      .insert([
        { 
          text: type === 'text' ? content : null, 
          image_url: type === 'image' ? content : null, 
          type,
          sender_id: (await supabase.auth.getUser()).data.user?.id, // ID-ga qofka diray
          isMe: true // Kani waa macmiilka dhankiisa
        }
      ]);
    
    if (error) console.log("Error sending:", error.message);
  };

  return (
    <ChatContext.Provider value={{ messages, sendMessage }}>
      {children}
    </ChatContext.Provider>
  );
}

export const useChat = () => useContext(ChatContext);
