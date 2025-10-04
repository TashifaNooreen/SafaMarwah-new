'use client';

import { useState } from 'react';
import { Header } from '@/components/layout/header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Send, Sparkles } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function ChatPage() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Assalamu Alaikum! Tell me your Umrah preferences and I’ll find the perfect package for you.',
    },
  ]);
  const [input, setInput] = useState('');
  
  const botAvatar = PlaceHolderImages.find(p => p.id === 'logo-icon-bw');

  const handleSendMessage = () => {
    if (input.trim()) {
      setMessages([...messages, { role: 'user', content: input }]);
      // Here you would typically call the AI agent
      setInput('');
    }
  };

  return (
    <div className="flex h-screen flex-col bg-muted/20">
      <Header />
      <div className="flex-1 overflow-y-auto p-4 md:p-6">
        <div className="mx-auto max-w-2xl space-y-6">
          {messages.map((message, index) => (
            <div key={index} className={`flex items-start gap-4 ${message.role === 'user' ? 'justify-end' : ''}`}>
              {message.role === 'assistant' && (
                <Avatar className="h-8 w-8 border">
                   <AvatarImage src="https://picsum.photos/seed/bot/100/100" alt="AI Agent" data-ai-hint="mosque logo" />
                  <AvatarFallback>AI</AvatarFallback>
                </Avatar>
              )}
              <div className={`max-w-[75%] rounded-lg p-3 ${message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-background shadow-sm'}`}>
                <p className="text-sm">{message.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t bg-background p-4">
        <div className="mx-auto max-w-2xl">
          <div className="relative">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="e.g., 'I am looking for a 10 day package under ₹1,50,000...'"
              className="pr-12"
            />
            <Button
              type="submit"
              size="icon"
              className="absolute right-2 top-1/2 h-8 w-8 -translate-y-1/2 bg-accent text-accent-foreground hover:bg-accent/80"
              onClick={handleSendMessage}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
           <p className="mt-2 text-center text-xs text-muted-foreground">
              Powered by AI <Sparkles className="inline-block h-3 w-3" />
            </p>
        </div>
      </div>
    </div>
  );
}
