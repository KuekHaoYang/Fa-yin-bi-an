"use client";

import { useState, useEffect, useRef } from 'react';
import { Button, Card, Input, ScrollShadow } from "@nextui-org/react";
import { MessageCircle, X, Send } from "lucide-react";

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export function AIChatButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentStreamingMessage, setCurrentStreamingMessage] = useState('');
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const savedMessages = localStorage.getItem('chatHistory');
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('chatHistory', JSON.stringify(messages));
    
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, currentStreamingMessage]);

  // 自动调整输入框高度
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [input]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = { role: 'user' as const, content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setCurrentStreamingMessage('');

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });

      if (!response.ok) throw new Error('API request failed');

      const reader = response.body?.getReader();
      if (!reader) throw new Error('No reader available');

      let accumulatedMessage = '';
      
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const text = new TextDecoder().decode(value);
        accumulatedMessage += text;
        setCurrentStreamingMessage(accumulatedMessage);
      }

      setMessages(prev => [...prev, { role: 'assistant', content: accumulatedMessage }]);
      setCurrentStreamingMessage('');
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, { role: 'assistant', content: '抱歉，我现在无法回答。请稍后再试。' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewChat = () => {
    setMessages([]);
    setCurrentStreamingMessage('');
    localStorage.removeItem('chatHistory');
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen ? (
        <Card className="w-80 h-[500px] p-4 flex flex-col" style={{ 
          background: 'linear-gradient(to bottom, #F5F5DC, #FFF8DC)',
          border: '1px solid #D4AF37'
        }}>
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <MessageCircle size={20} className="text-[#D4AF37]" />
              <h3 className="text-lg font-semibold text-[#8B4513]">AI 师傅</h3>
            </div>
            <div className="flex gap-2">
              <Button 
                size="sm" 
                className="bg-[#D4AF37]/10 text-[#8B4513] hover:bg-[#D4AF37]/20"
                onPress={handleNewChat}
              >
                新对话
              </Button>
              <Button 
                isIconOnly 
                size="sm" 
                className="bg-[#D4AF37]/10 text-[#8B4513] hover:bg-[#D4AF37]/20"
                onPress={() => setIsOpen(false)}
              >
                <X size={20} />
              </Button>
            </div>
          </div>
          
          <ScrollShadow ref={chatContainerRef} className="flex-grow overflow-y-auto mb-4">
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`p-2 rounded-lg ${
                    message.role === 'user'
                      ? 'bg-[#D4AF37]/10 ml-4 text-[#8B4513]'
                      : 'bg-white/50 mr-4 text-[#8B4513]'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap break-words">{message.content}</p>
                </div>
              ))}
              {currentStreamingMessage && (
                <div className="bg-white/50 p-2 rounded-lg mr-4">
                  <p className="text-sm text-[#8B4513] whitespace-pre-wrap break-words">{currentStreamingMessage}</p>
                </div>
              )}
              {isLoading && !currentStreamingMessage && (
                <div className="bg-white/50 p-2 rounded-lg mr-4">
                  <p className="text-sm text-[#8B4513]">思考中...</p>
                </div>
              )}
            </div>
          </ScrollShadow>

          <div className="flex gap-2">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="请输入您的问题..."
              className="flex-1 resize-none rounded-lg px-3 py-2 text-[#8B4513] bg-[#FFF8DC] border-2 border-[#D4AF37]/30 hover:border-[#D4AF37] focus:border-[#D4AF37] focus:outline-none placeholder:text-[#D4AF37]/50 min-h-[40px] max-h-[120px]"
              style={{
                lineHeight: '1.5',
              }}
            />
            <Button
              isIconOnly
              size="sm"
              className="bg-[#D4AF37] text-white hover:bg-[#D4AF37]/80 h-10 w-10"
              onPress={handleSend}
              isLoading={isLoading}
            >
              <Send size={20} />
            </Button>
          </div>
        </Card>
      ) : (
        <Button
          isIconOnly
          className="rounded-full shadow-lg bg-[#D4AF37] text-white hover:bg-[#D4AF37]/80 h-12 w-12"
          onPress={() => setIsOpen(true)}
        >
          <MessageCircle size={24} />
        </Button>
      )}
    </div>
  );
} 