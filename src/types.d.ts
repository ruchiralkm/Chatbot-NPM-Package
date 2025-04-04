import React from "react";

declare module "@ruchiralk/chat-bot-com" {
  interface CustomResponses {
    greeting?: string;
    responses?: {
      [keyword: string]: string | ((input: string) => string);
    };
    defaultResponse?: string;
  }

  interface ChatbotProps {
    customResponses?: CustomResponses;
  }

  const Chatbot: React.FC<ChatbotProps>;
  export default Chatbot;
}
