
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useChat } from "@ai-sdk/react";
import { ScrollArea } from "./ui/scroll-area";
export default function Chat() {

    const { messages, input, handleInputChange, handleSubmit } = useChat({
        api: '/api/chat',
        body: {
            prompt: "You are a helpful assistant that can answer questions and help with tasks."
        }
    })
  return(
    <Card className="w-[440px]">
      <CardHeader>
        <CardTitle>AI Image Generator</CardTitle>
        <CardDescription>
          Generate images with AI
        </CardDescription>
        </CardHeader>
        <CardContent className="">
            <ScrollArea className=" w-full h-[600px] pr-4">
          { messages.map(message => {
            return(
                <div key={message.id} className="flex gap-3 mb-4 text-slate-700 text-sm">
                  { message.role === 'user' && (
                    <Avatar>
                        <AvatarImage src="https://github.com/klismanmelo.png" />
                        <AvatarFallback>KM</AvatarFallback>
                    </Avatar>
                  ) }  
                  { message.role === 'assistant' && (
                    <Avatar>
                        <AvatarImage src="https://github.com/rocketseat.png" />
                        <AvatarFallback>IA</AvatarFallback>
                    </Avatar>
                  ) }  
                    <p className="loading-relative">
                    <span className="block font-bold text-slate-700">
                        { message.role === 'user' ? 'You' : 'AI' }: 
                    </span>
                        { message.content }
                    </p>
                </div>
            );
          }) }
          </ScrollArea>
        </CardContent>
        <CardFooter>
            <form className="w-full flex gap-2" onSubmit={handleSubmit}>
                <Input placeholder="Enter your prompt" value={input} onChange={handleInputChange} /> 
                <Button type="submit">Click me</Button>
            </form>
        </CardFooter>
    </Card>     
  );
}