"use client";

import { Search, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const conversations = [
  {
    id: 1,
    company: "DHL Supply Chain",
    logo: "D",
    lastMessage: "Thank you for applying! We'll be in touch soon.",
    time: "2 hours ago",
    unread: true,
  },
  {
    id: 2,
    company: "Amazon Logistics",
    logo: "A",
    lastMessage: "Your application has been reviewed.",
    time: "1 day ago",
    unread: false,
  },
  {
    id: 3,
    company: "Dangote Transport",
    logo: "D",
    lastMessage: "Can you come in for an interview next week?",
    time: "2 days ago",
    unread: true,
  },
];

export default function MessagesPage() {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-heading font-bold">Messages</h1>
      </div>

      <div className="bg-white rounded-lg border overflow-hidden">
        <div className="grid lg:grid-cols-[320px_1fr] h-[600px]">
          {/* Left Sidebar - Conversations */}
          <div className="border-r flex flex-col">
            <div className="p-4 border-b">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search messages..." className="pl-9" />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              {conversations.map((conv) => (
                <button
                  key={conv.id}
                  className={`w-full p-4 flex gap-3 hover:bg-muted/50 transition-colors border-b ${
                    conv.unread ? "bg-blue-50/50" : ""
                  }`}
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-alt to-primary-alt/60 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-black font-semibold">{conv.logo}</span>
                  </div>
                  <div className="flex-1 text-left min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-sm truncate">{conv.company}</h3>
                      {conv.unread && <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0"></div>}
                    </div>
                    <p className="text-xs text-muted-foreground truncate">{conv.lastMessage}</p>
                    <p className="text-xs text-muted-foreground mt-1">{conv.time}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Right Content - Message Thread */}
          <div className="flex flex-col">
            <div className="p-4 border-b">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-primary-alt to-primary-alt/60 rounded-full flex items-center justify-center">
                  <span className="text-black font-semibold">D</span>
                </div>
                <div>
                  <h2 className="font-semibold">DHL Supply Chain</h2>
                  <p className="text-xs text-muted-foreground">Active now</p>
                </div>
              </div>
            </div>

            <div className="flex-1 p-6 overflow-y-auto">
              <div className="space-y-4 max-w-3xl">
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-primary-alt to-primary-alt/60 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-black text-xs font-semibold">D</span>
                  </div>
                  <div className="flex-1">
                    <div className="bg-muted rounded-lg p-3 inline-block max-w-md">
                      <p className="text-sm">
                        Thank you for applying for the HGV Class 1 Driver position. We've reviewed your application and
                        would like to schedule an interview.
                      </p>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">2 hours ago</p>
                  </div>
                </div>

                <div className="flex gap-3 justify-end">
                  <div className="flex-1 flex justify-end">
                    <div className="bg-primary-alt text-black rounded-lg p-3 inline-block max-w-md">
                      <p className="text-sm">
                        Thank you for reaching out! I'm very interested in the position. When would be a good time for
                        the interview?
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 border-t">
              <div className="flex gap-2">
                <Input placeholder="Type your message..." className="flex-1" />
                <Button className="bg-primary-alt hover:bg-primary-alt/90 text-black">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
