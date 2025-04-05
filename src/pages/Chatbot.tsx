
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Send, Mic, ToggleLeft, ToggleRight } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { api } from "@/lib/api";
import { Switch } from "@/components/ui/switch";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
}

const Chatbot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hi there! I'm MoneyMentor, your AI financial assistant. How can I help you today?",
      sender: "bot",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [useMockResponses, setUseMockResponses] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();


  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    // Generate unique ID
    const userMessageId = Date.now().toString();
    
    // Add user message to chat
    const userMessage: Message = {
      id: userMessageId,
      text: input,
      sender: "user",
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);
    
    try {
      // Call the API to get a response
      const response = await api.sendChatMessage(input, useMockResponses);
      
      const botMessageId = (Date.now() + 1).toString();
      const botMessage: Message = {
        id: botMessageId,
        text: response.response,
        sender: "bot",
      };
      
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        title: "Error",
        description: "Failed to get a response. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="shadow-lg border-2">
        <CardHeader className="bg-muted">
          <CardTitle className="text-center flex items-center justify-center gap-2">
            <span className="inline-block h-3 w-3 rounded-full bg-green-500"></span>
            MoneyMentor AI Assistant
          </CardTitle>
          <div className="flex justify-end items-center gap-2 text-sm">
            <span>Use Mock Responses</span>
            <Switch 
              checked={useMockResponses} 
              onCheckedChange={setUseMockResponses}
              aria-label="Toggle mock responses"
            />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="h-[60vh] overflow-y-auto p-4 flex flex-col">
            <div className="space-y-4 flex-grow">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`chatbot-message ${
                    message.sender === "user" ? "user-message" : "bot-message"
                  }`}
                >
                  {message.text}
                </div>
              ))}
              
              {isTyping && (
                <div className="bot-message p-3">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>
          
          <div className="border-t p-4">
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <Input
                placeholder="Ask anything about investing..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isTyping}
                className="flex-grow"
              />
              <Button type="submit" disabled={isTyping || !input.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </form>
            <p className="text-xs text-muted-foreground mt-2 text-center">
              {useMockResponses ? "Using mock responses for testing." : "Using Gemini AI for responses. Not financial advice. Always consult with a professional advisor."}
            </p>
          </div>
        </CardContent>
      </Card>
      
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Example Questions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            "What is a mutual fund?",
            "How do stocks work?",
            "What should I invest in as a beginner?",
            "Explain investment risk",
            "What is dollar-cost averaging?",
            "Should I invest in gold during inflation?"
          ].map((question, index) => (
            <Button
              key={index}
              variant="outline"
              className="justify-start h-auto py-2 px-4 font-normal"
              onClick={() => {
                setInput(question);
                toast({
                  title: "Question selected",
                  description: "Click send to ask this question",
                });
              }}
            >
              {question}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
