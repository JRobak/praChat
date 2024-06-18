'use client'


import React from "react";
import ChatMessagesBox from "@/app/components/chat/ChatMessagesBox";
import ChatInput from "@/app/components/chat/ChatInput";

const ChatContainer: React.FC = () => {


  return (
      <div className="w-full h-full flex flex-col overflow-hidden">
          <div className="flex-1 overflow-auto">
              <ChatMessagesBox/>
          </div>
          <div className="h-14 ms:h-30 flex-none">
              <ChatInput/>
          </div>
      </div>
  );
};

export default ChatContainer;
