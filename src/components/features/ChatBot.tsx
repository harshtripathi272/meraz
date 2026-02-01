"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User, Sparkles } from "lucide-react";

interface Message {
  id: number;
  type: "bot" | "user";
  text: string;
  timestamp: Date;
}

const defaultResponse = "I'm not quite sure about that. For specific queries, please email us at meraz@iitbhilai.ac.in.";

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: "bot",
      text: "System Online. How can I assist you with the Meraz protocol?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      type: "user",
      text: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // Simulate thinking delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    const botMessage: Message = {
      id: messages.length + 2,
      type: "bot",
      text: defaultResponse, // Simplify for this reskin
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, botMessage]);
  };

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-600/20 md:w-16 md:h-16 ${
          isOpen ? "hidden" : ""
        }`}
      >
        <MessageCircle className="w-6 h-6 text-white" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 w-[360px] h-[500px] bg-obsidian border border-white/10 rounded-2xl flex flex-col shadow-2xl shadow-indigo-900/40 font-mono text-sm"
          >
            {/* Header */}
            <div className="p-4 border-b border-white/10 flex items-center justify-between bg-charcoal rounded-t-2xl">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                <span className="text-white tracking-widest uppercase text-xs">AI Assistant</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/50 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg text-xs leading-relaxed ${
                      message.type === "bot"
                        ? "bg-white/5 text-text-secondary border border-white/5"
                        : "bg-indigo-600 text-white"
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-white/10">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Type query..."
                  className="flex-1 bg-charcoal border border-white/10 rounded px-3 py-2 text-white text-xs focus:outline-none focus:border-indigo-500"
                />
                <button
                  onClick={handleSend}
                  className="bg-white text-black p-2 rounded hover:bg-gray-200"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
