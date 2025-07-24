// LiveChat.tsx
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageSquare, Send, User } from 'lucide-react';
import type { ChatMessage } from './types';

const LiveChat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;
    
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      content: input,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages([...messages, newMessage]);
    setInput('');

    // Simulate support response
    setTimeout(() => {
      const supportMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: "Thank you for reaching out. Our support team will assist you shortly.",
        sender: 'support',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, supportMessage]);
    }, 1000);
  };

  return (
    <Card className="w-full h-[600px] bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border-2 border-green-100/50 dark:border-blue-900/30 rounded-2xl shadow-lg hover:shadow-green-100/50 transition-all duration-300">
      <CardHeader className="bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900/50 dark:to-blue-900/50 p-6 rounded-t-2xl">
        <CardTitle className="text-xl font-bold text-green-900 dark:text-white flex items-center gap-2">
          <MessageSquare className="text-green-600 dark:text-blue-400" />
          Live Support Chat
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 flex flex-col h-[calc(100%-5rem)]">
        <ScrollArea className="flex-grow mb-4 pr-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-green-100 dark:bg-blue-900 text-green-900 dark:text-white'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    {message.sender === 'user' ? (
                      <User className="w-4 h-4" />
                    ) : (
                      <MessageSquare className="w-4 h-4" />
                    )}
                    <span className="text-xs opacity-70">
                      {message.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                  <p>{message.content}</p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
        
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Type your message..."
            className="bg-white/80 dark:bg-gray-800/80 border-green-100 dark:border-blue-900"
          />
          <Button
            onClick={sendMessage}
            className="bg-green-600 hover:bg-green-700 dark:bg-blue-600 dark:hover:bg-blue-700"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default LiveChat;