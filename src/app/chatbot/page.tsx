'use client'

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Send, MessageCircle } from "lucide-react";
import { useChat } from "@ai-sdk/react";

export default function Chatbot() {
    const { messages, input, handleInputChange, handleSubmit } = useChat({
        api: '/api/chat',
        body: {
            prompt: "You are a helpful assistant that can answer questions and help with tasks."
        }
    })
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 flex flex-col items-end">
      {open && (
        <Card className="w-80 shadow-lg rounded-2xl">
          <CardHeader className="bg-blue-500 text-white p-4 rounded-t-2xl">
            <CardTitle>Chatbot IA</CardTitle>
            <p className="text-sm">Converse com nossa inteligência artificial</p>
          </CardHeader>
          <CardContent className="p-4 space-y-2 max-h-60 overflow-y-auto">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`p-2 rounded-lg ${
                  msg.role  === "assistant" ? "bg-gray-200" : "bg-blue-500 text-white self-end"
                }`}
              >
                {msg.content}
              </div>
            ))}
          </CardContent>
          <div className="p-4 border-t flex items-center gap-2">
            <Input
              value={input}
              onChange={handleInputChange}
              placeholder="Digite sua mensagem..."
              className="flex-1"
            />
            <Button onClick={handleSubmit} size="icon">
              <Send className="w-5 h-5" />
            </Button>
          </div>
        </Card>
      )}
      <Button
        onClick={() => setOpen(!open)}
        className="rounded-full shadow-lg p-3 bg-blue-500 text-white"
      >
        <MessageCircle className="w-6 h-6" />
      </Button>
    </div>
  );
}
