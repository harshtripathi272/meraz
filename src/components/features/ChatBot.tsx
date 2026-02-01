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

interface FAQ {
  question: string;
  answer: string;
  keywords: string[];
}

const faqs: FAQ[] = [
  {
    question: "When is Meraz 6.0?",
    answer: "Meraz 6.0 is scheduled for February 15-17, 2026. Three days of non-stop celebration, innovation, and cultural extravaganza!",
    keywords: ["when", "date", "dates", "schedule", "time"],
  },
  {
    question: "How do I register for events?",
    answer: "You can register for events through our Events page. Click on any event card to see details and find the registration link. Some events require a valid pass, so make sure to get yours first!",
    keywords: ["register", "registration", "sign up", "participate", "join"],
  },
  {
    question: "What's the difference between Student Pass and Access Pass?",
    answer: "Student Pass (₹400-500) gives you full access including Pro-Night concerts. Access Pass (₹100-200) allows campus entry for daytime events but NO Pro-Night access. Group discounts available for both!",
    keywords: ["pass", "passes", "student", "access", "price", "cost", "difference"],
  },
  {
    question: "How can I get to IIT Bhilai?",
    answer: "IIT Bhilai is located at Sejbahar, Raipur, Chhattisgarh. The nearest airport is Swami Vivekananda Airport (Raipur). We'll have shuttle services from the airport and railway station during the fest!",
    keywords: ["location", "address", "reach", "transport", "airport", "travel", "directions"],
  },
  {
    question: "Is accommodation available?",
    answer: "Yes! We provide accommodation for outstation participants at nominal charges. Booking opens closer to the event date. Stay tuned to our social media for announcements!",
    keywords: ["accommodation", "stay", "hotel", "hostel", "room", "lodging"],
  },
  {
    question: "Who are the Pro-Night artists?",
    answer: "Pro-Night artist lineup will be announced soon! Follow us on Instagram @meraz_iitbhilai for exclusive announcements and sneak peeks. Trust us, it's going to be EPIC! 🎤",
    keywords: ["artist", "artists", "concert", "pro-night", "pronite", "performer", "celebrity"],
  },
  {
    question: "Can I participate in multiple events?",
    answer: "Absolutely! You can participate in as many events as you want (schedule permitting). Just make sure to register for each event separately. Some events have team size requirements.",
    keywords: ["multiple", "many", "events", "several", "participate"],
  },
  {
    question: "I need help with my registration",
    answer: "For registration issues, please contact us at meraz@iitbhilai.ac.in or call +91 94079 00542. Our team will help you resolve any issues quickly!",
    keywords: ["help", "issue", "problem", "support", "contact", "query"],
  },
];

const defaultResponse = "I'm not quite sure about that. For specific queries, please email us at meraz@iitbhilai.ac.in or call +91 94079 00542. Is there anything else I can help you with?";

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: "bot",
      text: "Hey there! 👋 I'm the Meraz AI assistant. How can I help you today? Ask me about events, passes, registration, or anything about Meraz 6.0!",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const findAnswer = (query: string): string => {
    const lowerQuery = query.toLowerCase();
    
    for (const faq of faqs) {
      for (const keyword of faq.keywords) {
        if (lowerQuery.includes(keyword)) {
          return faq.answer;
        }
      }
    }
    
    return defaultResponse;
  };

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
    setIsTyping(true);

    // Simulate thinking delay
    await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 1000));

    const answer = findAnswer(input);
    const botMessage: Message = {
      id: messages.length + 2,
      type: "bot",
      text: answer,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, botMessage]);
    setIsTyping(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const quickQuestions = [
    "When is Meraz?",
    "Pass prices?",
    "How to register?",
    "Pro-Night artists?",
  ];

  return (
    <>
      {/* Chat Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring" }}
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-neon-magenta to-neon-teal flex items-center justify-center shadow-lg shadow-neon-magenta/30 hover:scale-110 transition-transform ${
          isOpen ? "hidden" : ""
        }`}
      >
        <MessageCircle className="w-6 h-6 text-primary-dark" />
        
        {/* Pulse effect */}
        <span className="absolute inset-0 rounded-full bg-neon-magenta animate-ping opacity-20" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 z-50 w-[360px] max-w-[calc(100vw-3rem)] h-[500px] max-h-[calc(100vh-6rem)] glass-card rounded-2xl overflow-hidden flex flex-col shadow-2xl shadow-neon-magenta/20"
          >
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-neon-magenta/20 to-neon-teal/20 border-b border-glass-border flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-neon-magenta to-neon-teal flex items-center justify-center">
                  <Bot className="w-5 h-5 text-primary-dark" />
                </div>
                <div>
                  <div className="font-semibold text-text-primary text-sm">Meraz Assistant</div>
                  <div className="text-xs text-neon-teal flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-neon-teal animate-pulse" />
                    Online
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-lg hover:bg-surface-light flex items-center justify-center text-text-secondary hover:text-text-primary transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-2 ${message.type === "user" ? "flex-row-reverse" : ""}`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${
                      message.type === "bot"
                        ? "bg-gradient-to-br from-neon-magenta to-neon-teal"
                        : "bg-surface-light"
                    }`}
                  >
                    {message.type === "bot" ? (
                      <Sparkles className="w-4 h-4 text-primary-dark" />
                    ) : (
                      <User className="w-4 h-4 text-text-secondary" />
                    )}
                  </div>
                  <div
                    className={`max-w-[75%] p-3 rounded-2xl text-sm ${
                      message.type === "bot"
                        ? "bg-surface-light text-text-primary rounded-tl-none"
                        : "bg-gradient-to-r from-neon-magenta/30 to-neon-teal/30 text-text-primary rounded-tr-none"
                    }`}
                  >
                    {message.text}
                  </div>
                </motion.div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-2"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-neon-magenta to-neon-teal flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-primary-dark" />
                  </div>
                  <div className="bg-surface-light p-3 rounded-2xl rounded-tl-none">
                    <div className="flex gap-1">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          animate={{ y: [0, -5, 0] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                          className="w-2 h-2 rounded-full bg-text-muted"
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick questions */}
            {messages.length <= 2 && (
              <div className="px-4 pb-2">
                <div className="flex flex-wrap gap-2">
                  {quickQuestions.map((q) => (
                    <button
                      key={q}
                      onClick={() => {
                        setInput(q);
                      }}
                      className="px-3 py-1.5 rounded-full text-xs border border-glass-border text-text-secondary hover:border-neon-magenta hover:text-neon-magenta transition-colors"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t border-glass-border">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything..."
                  className="flex-1 px-4 py-2.5 rounded-xl bg-surface-dark border border-glass-border text-text-primary placeholder:text-text-muted focus:outline-none focus:border-neon-magenta text-sm transition-colors"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim()}
                  className="w-10 h-10 rounded-xl bg-gradient-to-r from-neon-magenta to-neon-teal flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-neon-magenta/20 transition-all"
                >
                  <Send className="w-4 h-4 text-primary-dark" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
