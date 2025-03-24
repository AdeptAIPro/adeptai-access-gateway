
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  MessageCircle, 
  Send, 
  X, 
  MinusCircle, 
  Maximize2, 
  Loader
} from "lucide-react";
import { processMessage } from "@/services/chatbot/ChatbotService";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface Message {
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface ChatbotProps {
  position?: "bottom-right" | "bottom-left";
}

const Chatbot: React.FC<ChatbotProps> = ({ position = "bottom-right" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  // Add initial bot message when chat opens for the first time
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          text: "Hello! I'm AdeptAI's virtual assistant. How can I help you today?",
          isUser: false,
          timestamp: new Date()
        }
      ]);
    }
  }, [isOpen]);

  // Scroll to bottom of chat when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && !isMinimized && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen, isMinimized]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (isMinimized) setIsMinimized(false);
  };

  const toggleMinimize = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMinimized(!isMinimized);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    // Add user message
    const userMessage: Message = {
      text: newMessage,
      isUser: true,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setNewMessage("");
    setIsLoading(true);

    try {
      // Get response from chatbot service
      const response = await processMessage(newMessage);

      // Add bot response with a small delay to appear more natural
      setTimeout(() => {
        setMessages(prev => [
          ...prev, 
          {
            text: response,
            isUser: false,
            timestamp: new Date()
          }
        ]);
        setIsLoading(false);
      }, 800);
    } catch (error) {
      console.error("Error processing message:", error);
      toast({
        title: "Error",
        description: "Failed to get a response. Please try again.",
        variant: "destructive"
      });
      setIsLoading(false);
    }
  };

  return (
    <div 
      className={cn(
        "fixed z-50 transition-all duration-300",
        position === "bottom-right" ? "bottom-6 right-6" : "bottom-6 left-6"
      )}
    >
      {/* Chatbot Button */}
      {!isOpen && (
        <Button 
          onClick={toggleChat}
          className="h-14 w-14 rounded-full bg-adept hover:bg-adept-dark shadow-lg"
        >
          <MessageCircle className="h-6 w-6 text-white" />
        </Button>
      )}

      {/* Chatbot Window */}
      {isOpen && (
        <div 
          className={cn(
            "bg-white rounded-lg shadow-xl border overflow-hidden transition-all duration-300",
            isMinimized ? "w-64 h-14" : "w-80 sm:w-96 h-[500px]"
          )}
        >
          {/* Chat Header */}
          <div 
            className="bg-adept text-white px-4 py-3 flex items-center justify-between cursor-pointer"
            onClick={isMinimized ? toggleChat : undefined}
          >
            <div className="flex items-center space-x-2">
              <MessageCircle className="h-5 w-5" />
              <h3 className="font-medium">AdeptAI Assistant</h3>
            </div>
            <div className="flex items-center space-x-1">
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-7 w-7 text-white hover:bg-adept-dark"
                onClick={toggleMinimize}
              >
                {isMinimized ? <Maximize2 className="h-4 w-4" /> : <MinusCircle className="h-4 w-4" />}
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-7 w-7 text-white hover:bg-adept-dark"
                onClick={toggleChat}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Chat Body - Only shown when not minimized */}
          {!isMinimized && (
            <>
              <ScrollArea className="h-[400px] p-4 bg-gray-50">
                <div className="space-y-4">
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={cn(
                        "flex",
                        message.isUser ? "justify-end" : "justify-start"
                      )}
                    >
                      <div
                        className={cn(
                          "max-w-[80%] rounded-lg px-4 py-2 break-words",
                          message.isUser
                            ? "bg-adept text-white rounded-tr-none"
                            : "bg-gray-200 text-gray-800 rounded-tl-none"
                        )}
                      >
                        <p>{message.text}</p>
                        <p className="text-xs opacity-70 mt-1">
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                  ))}
                  
                  {/* Loading indicator */}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-gray-200 text-gray-800 rounded-lg rounded-tl-none px-4 py-2">
                        <div className="flex items-center space-x-2">
                          <Loader className="h-4 w-4 animate-spin" />
                          <span className="text-sm">Thinking...</span>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>

              {/* Chat Input */}
              <form
                onSubmit={handleSubmit}
                className="border-t p-3 bg-white flex items-center space-x-2"
              >
                <Input
                  ref={inputRef}
                  type="text"
                  placeholder="Type your message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="flex-1"
                  disabled={isLoading}
                />
                <Button 
                  type="submit" 
                  size="icon"
                  className="bg-adept hover:bg-adept-dark"
                  disabled={isLoading || !newMessage.trim()}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Chatbot;
