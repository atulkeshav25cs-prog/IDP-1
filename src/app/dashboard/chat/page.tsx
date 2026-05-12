"use client";

import { useState, useEffect, useRef } from "react";
import { Send, Bot, User, Loader2, Sparkles } from "lucide-react";
import { sendMessage, getChatHistory } from "@/actions/chat.actions";

type Message = {
  id: string;
  role: string;
  content: string;
};

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load initial history
    const loadHistory = async () => {
      const res = await getChatHistory();
      if (res.success && res.messages) {
        if (res.messages.length === 0) {
          // Add a local welcome message if history is empty
          setMessages([{
            id: "welcome",
            role: "assistant",
            content: "Hello! I'm your AI Career Counselor. I've analyzed your profile and matches. How can I help you today? You can ask me about interview prep, salary expectations, or roadmap details."
          }]);
        } else {
          setMessages(res.messages);
        }
      }
      setIsFetching(false);
    };
    loadHistory();
  }, []);

  useEffect(() => {
    // Auto scroll to bottom
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg: Message = { id: Date.now().toString(), role: "user", content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await sendMessage(userMsg.content);
      if (res.success && res.aiMessage) {
        setMessages(prev => [...prev, res.aiMessage]);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] max-w-4xl mx-auto premium-card overflow-hidden">
      {/* Chat Header */}
      <div className="p-4 md:p-6 border-b border-border bg-card/50 flex items-center justify-between z-10 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="font-bold text-foreground">AI Career Counselor</h2>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-green-500 inline-block"></span> Online
            </p>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 bg-secondary/10">
        {isFetching ? (
          <div className="flex items-center justify-center h-full">
            <Loader2 className="w-6 h-6 animate-spin text-primary" />
          </div>
        ) : (
          <>
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`flex gap-4 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === "user" ? "bg-primary text-primary-foreground" : "bg-card border border-border text-primary"}`}>
                  {msg.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>
                <div className={`max-w-[80%] rounded-2xl p-4 ${
                  msg.role === "user" 
                    ? "bg-primary text-primary-foreground rounded-tr-sm" 
                    : "bg-card border border-border text-foreground rounded-tl-sm shadow-sm"
                }`}>
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-4 flex-row">
                <div className="w-8 h-8 rounded-full bg-card border border-border text-primary flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="bg-card border border-border rounded-2xl rounded-tl-sm p-4 shadow-sm flex gap-1 items-center">
                  <span className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
                  <span className="w-1.5 h-1.5 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
                  <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 bg-card border-t border-border shrink-0">
        <form onSubmit={handleSend} className="relative flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about interview prep, salary, or your roadmap..."
            className="w-full pl-4 pr-12 py-4 bg-secondary border border-border rounded-xl focus:outline-none focus:border-primary focus:bg-background transition-colors text-sm"
            disabled={isLoading || isFetching}
          />
          <button 
            type="submit" 
            disabled={!input.trim() || isLoading || isFetching}
            className="absolute right-2 p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors disabled:opacity-50 disabled:hover:bg-transparent"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
        <div className="text-center mt-2">
          <p className="text-[10px] text-muted-foreground">AI Counselor can make mistakes. Consider verifying important career facts.</p>
        </div>
      </div>
    </div>
  );
}
