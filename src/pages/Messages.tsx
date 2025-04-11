
import AppLayout from "@/components/layout/AppLayout";
import { AppSidebar } from "@/components/sidebar/AppSidebar";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Send } from "lucide-react";
import { useState } from "react";
import UserAvatar from "@/components/shared/UserAvatar";

type Message = {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  text: string;
  timestamp: string;
  isOwn: boolean;
};

type Conversation = {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
};

const initialConversations: Conversation[] = [
  {
    id: "1",
    userId: "101",
    userName: "Priya Sharma",
    userAvatar: "",
    lastMessage: "Can you share the notes from yesterday's class?",
    timestamp: "10:30 AM",
    unread: 1,
  },
  {
    id: "2",
    userId: "102",
    userName: "Arjun Patel",
    userAvatar: "",
    lastMessage: "Are you going to the event tonight?",
    timestamp: "Yesterday",
    unread: 0,
  },
  {
    id: "3",
    userId: "103",
    userName: "Neha Gupta",
    userAvatar: "",
    lastMessage: "Thanks for the help with the project!",
    timestamp: "Monday",
    unread: 0,
  },
  {
    id: "4",
    userId: "104",
    userName: "Rahul Kumar",
    userAvatar: "",
    lastMessage: "Let's meet at the cafeteria after class",
    timestamp: "Monday",
    unread: 1,
  },
];

const initialMessages: Record<string, Message[]> = {
  "1": [
    {
      id: "m1",
      userId: "101",
      userName: "Priya Sharma",
      userAvatar: "",
      text: "Hey there! Hope you're doing well.",
      timestamp: "10:15 AM",
      isOwn: false,
    },
    {
      id: "m2",
      userId: "current",
      userName: "John Doe",
      userAvatar: "",
      text: "Hi Priya! I'm good, how about you?",
      timestamp: "10:18 AM",
      isOwn: true,
    },
    {
      id: "m3",
      userId: "101",
      userName: "Priya Sharma",
      userAvatar: "",
      text: "I'm doing great! Can you share the notes from yesterday's class?",
      timestamp: "10:30 AM",
      isOwn: false,
    },
  ],
  "2": [
    {
      id: "m4",
      userId: "current",
      userName: "John Doe",
      userAvatar: "",
      text: "Hey, are there any events happening this week?",
      timestamp: "Yesterday",
      isOwn: true,
    },
    {
      id: "m5",
      userId: "102",
      userName: "Arjun Patel",
      userAvatar: "",
      text: "Yes! There's a tech fest on Friday. Are you going to the event tonight?",
      timestamp: "Yesterday",
      isOwn: false,
    },
  ],
};

const Messages = () => {
  const [conversations, setConversations] = useState(initialConversations);
  const [selectedConversation, setSelectedConversation] = useState<string | null>(
    "1"
  );
  const [messageText, setMessageText] = useState("");
  const [messages, setMessages] = useState(initialMessages);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredConversations = conversations.filter((convo) =>
    convo.userName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectConversation = (id: string) => {
    setSelectedConversation(id);
    // Mark as read
    setConversations((prevConvos) =>
      prevConvos.map((convo) =>
        convo.id === id ? { ...convo, unread: 0 } : convo
      )
    );
  };

  const handleSendMessage = () => {
    if (!messageText.trim() || !selectedConversation) return;

    const newMessage: Message = {
      id: `m${Date.now()}`,
      userId: "current",
      userName: "John Doe",
      userAvatar: "",
      text: messageText,
      timestamp: "Just now",
      isOwn: true,
    };

    setMessages((prevMessages) => ({
      ...prevMessages,
      [selectedConversation]: [
        ...(prevMessages[selectedConversation] || []),
        newMessage,
      ],
    }));

    // Update last message in conversations list
    setConversations((prevConvos) =>
      prevConvos.map((convo) =>
        convo.id === selectedConversation
          ? {
              ...convo,
              lastMessage: messageText,
              timestamp: "Just now",
            }
          : convo
      )
    );

    setMessageText("");
  };

  return (
    <AppLayout>
      <AppSidebar />
      <main className="flex flex-1 overflow-hidden">
        <div className="flex w-full h-full">
          {/* Conversation list */}
          <div className="w-full md:w-1/3 border-r flex flex-col">
            <div className="p-4 border-b">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search messages..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto">
              {filteredConversations.map((conversation) => (
                <div
                  key={conversation.id}
                  className={`p-3 border-b cursor-pointer hover:bg-accent transition-colors ${
                    selectedConversation === conversation.id ? "bg-accent" : ""
                  }`}
                  onClick={() => handleSelectConversation(conversation.id)}
                >
                  <div className="flex items-center">
                    <div className="relative">
                      <UserAvatar
                        user={{
                          name: conversation.userName,
                          avatarUrl: conversation.userAvatar,
                        }}
                        className="h-10 w-10 mr-3"
                      />
                      {conversation.unread > 0 && (
                        <span className="absolute -top-1 -right-1 bg-cuPurple-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                          {conversation.unread}
                        </span>
                      )}
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <div className="flex justify-between items-center mb-1">
                        <p className="font-medium">{conversation.userName}</p>
                        <span className="text-xs text-muted-foreground">
                          {conversation.timestamp}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">
                        {conversation.lastMessage}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Message area */}
          <div className="hidden md:flex flex-col flex-1">
            {selectedConversation ? (
              <>
                {/* Chat header */}
                <div className="p-4 border-b flex items-center">
                  <UserAvatar
                    user={{
                      name: conversations.find(
                        (c) => c.id === selectedConversation
                      )?.userName || "",
                      avatarUrl: "",
                    }}
                    className="h-10 w-10 mr-3"
                  />
                  <div>
                    <p className="font-medium">
                      {
                        conversations.find(
                          (c) => c.id === selectedConversation
                        )?.userName
                      }
                    </p>
                    <p className="text-xs text-muted-foreground">Online</p>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 p-4 overflow-y-auto">
                  {messages[selectedConversation]?.map((message) => (
                    <div
                      key={message.id}
                      className={`flex mb-4 ${
                        message.isOwn ? "justify-end" : "justify-start"
                      }`}
                    >
                      {!message.isOwn && (
                        <UserAvatar
                          user={{
                            name: message.userName,
                            avatarUrl: message.userAvatar,
                          }}
                          className="h-8 w-8 mr-2 self-end"
                        />
                      )}
                      <div
                        className={`max-w-xs p-3 rounded-lg ${
                          message.isOwn
                            ? "bg-cuPurple-500 text-white rounded-br-none"
                            : "bg-accent rounded-bl-none"
                        }`}
                      >
                        <p className="text-sm">{message.text}</p>
                        <span
                          className={`text-xs mt-1 block ${
                            message.isOwn
                              ? "text-white text-opacity-80"
                              : "text-muted-foreground"
                          }`}
                        >
                          {message.timestamp}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Message input */}
                <div className="p-3 border-t">
                  <div className="flex">
                    <Input
                      placeholder="Type a message..."
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      className="mr-2"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleSendMessage();
                        }
                      }}
                    />
                    <Button
                      onClick={handleSendMessage}
                      disabled={!messageText.trim()}
                      className="bg-cuPurple-600 hover:bg-cuPurple-700"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center p-4">
                <Card className="w-full max-w-md">
                  <CardContent className="p-6 text-center">
                    <p className="mb-2">Select a conversation to start messaging</p>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </main>
    </AppLayout>
  );
};

export default Messages;
