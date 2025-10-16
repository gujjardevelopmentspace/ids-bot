import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { 
  Search,
  Star,
  Send,
  MoreVertical,
  Archive,
  Trash2,
  Phone,
  Video,
  Paperclip,
  Smile,
  Clock,
  Check,
  CheckCheck,
  Reply,
  Forward,
  Copy
} from "lucide-react";

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'contact';
  timestamp: string;
  status: 'sent' | 'delivered' | 'read';
  type: 'text' | 'image' | 'file';
}

interface Conversation {
  id: number;
  name: string;
  phone: string;
  lastMessage: string;
  timestamp: string;
  replyStatus: 'expired' | 'active';
  hoursLeft?: number;
  hasStar?: boolean;
  isArchived?: boolean;
  unreadCount: number;
  messages: Message[];
  lastSeen?: string;
}

const ChatsInbox = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<'all' | 'mine' | 'new'>('all');
  const [selectedChat, setSelectedChat] = useState<number | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load conversations from localStorage
  const [conversations, setConversations] = useState<Conversation[]>(() => {
    const saved = localStorage.getItem('chatConversations');
    return saved ? JSON.parse(saved) : [
      {
        id: 1,
        name: "Ch Yahya",
        phone: "+92 300 1234567",
        lastMessage: "PM@Netmt3jpayvY",
        timestamp: "an hour ago",
        replyStatus: 'expired',
        unreadCount: 0,
        messages: [
          { id: '1', content: "PM@Netmt3jpayvY", sender: 'contact', timestamp: '2025-01-14T13:00:00', status: 'read', type: 'text' }
        ]
      },
      {
        id: 2,
        name: "Maaz Ali",
        phone: "+92 301 2345678",
        lastMessage: "Let me ask him.",
        timestamp: "3 hours ago",
        replyStatus: 'active',
        hoursLeft: 21,
        unreadCount: 2,
        messages: [
          { id: '1', content: "Hi, can you help me with something?", sender: 'contact', timestamp: '2025-01-14T10:00:00', status: 'read', type: 'text' },
          { id: '2', content: "Sure, what do you need?", sender: 'user', timestamp: '2025-01-14T10:05:00', status: 'read', type: 'text' },
          { id: '3', content: "Let me ask him.", sender: 'contact', timestamp: '2025-01-14T11:00:00', status: 'delivered', type: 'text' }
        ]
      },
      {
        id: 3,
        name: "Bilal Khattak",
        phone: "+92 302 3456789",
        lastMessage: "Request dekain bhai",
        timestamp: "7 hours ago",
        replyStatus: 'active',
        hoursLeft: 17,
        unreadCount: 1,
        messages: [
          { id: '1', content: "Request dekain bhai", sender: 'contact', timestamp: '2025-01-14T07:00:00', status: 'delivered', type: 'text' }
        ]
      },
      {
        id: 4,
        name: "Muhammad Iqbal",
        phone: "+92 303 4567890",
        lastMessage: "Okay",
        timestamp: "8 hours ago",
        replyStatus: 'active',
        hoursLeft: 16,
        unreadCount: 0,
        messages: [
          { id: '1', content: "Can we schedule a meeting?", sender: 'user', timestamp: '2025-01-14T06:00:00', status: 'read', type: 'text' },
          { id: '2', content: "Okay", sender: 'contact', timestamp: '2025-01-14T06:30:00', status: 'read', type: 'text' }
        ]
      },
      {
        id: 5,
        name: "447710173736",
        phone: "+44 771 0173736",
        lastMessage: "WhatsApp",
        timestamp: "11 hours ago",
        replyStatus: 'expired',
        hasStar: true,
        unreadCount: 0,
        messages: [
          { id: '1', content: "WhatsApp", sender: 'contact', timestamp: '2025-01-14T03:00:00', status: 'read', type: 'text' }
        ]
      },
      {
        id: 6,
        name: "Ebad",
        phone: "+92 304 5678901",
        lastMessage: "https://s3.us-east-1.wasabisys.com/flaxx...",
        timestamp: "13 hours ago",
        replyStatus: 'active',
        hoursLeft: 11,
        unreadCount: 0,
        messages: [
          { id: '1', content: "https://s3.us-east-1.wasabisys.com/flaxx...", sender: 'contact', timestamp: '2025-01-14T01:00:00', status: 'read', type: 'text' }
        ]
      }
    ];
  });

  // Save conversations to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('chatConversations', JSON.stringify(conversations));
  }, [conversations]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversations, selectedChat]);

  const getInitials = (name: string) => {
    if (name.match(/^\d+$/)) {
      return name.slice(-1);
    }
    return name.split(' ').map(n => n[0]).join('').slice(0, 2);
  };

  const filteredConversations = conversations.filter(conv => {
    const matchesSearch = conv.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         conv.lastMessage.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeTab === 'mine') return false; // No conversations assigned to current user
    if (activeTab === 'new') return conv.replyStatus === 'active';
    if (conv.isArchived) return false;
    return matchesSearch;
  });

  const getTabCount = (tab: 'all' | 'mine' | 'new') => {
    switch (tab) {
      case 'all': return conversations.filter(c => !c.isArchived).length;
      case 'mine': return 0;
      case 'new': return conversations.filter(c => c.replyStatus === 'active' && !c.isArchived).length;
      default: return 0;
    }
  };

  const selectedConversation = conversations.find(conv => conv.id === selectedChat);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedChat) return;

    const message: Message = {
      id: Date.now().toString(),
      content: newMessage.trim(),
      sender: 'user',
      timestamp: new Date().toISOString(),
      status: 'sent',
      type: 'text'
    };

    setConversations(prev => prev.map(conv => 
      conv.id === selectedChat 
        ? {
            ...conv,
            messages: [...conv.messages, message],
            lastMessage: message.content,
            timestamp: 'now',
            unreadCount: 0
          }
        : conv
    ));

    setNewMessage("");
    
    // Simulate message delivery and read status
    setTimeout(() => {
      setConversations(prev => prev.map(conv => 
        conv.id === selectedChat 
          ? {
              ...conv,
              messages: conv.messages.map(msg => 
                msg.id === message.id 
                  ? { ...msg, status: 'delivered' }
                  : msg
              )
            }
          : conv
      ));
    }, 1000);

    setTimeout(() => {
      setConversations(prev => prev.map(conv => 
        conv.id === selectedChat 
          ? {
              ...conv,
              messages: conv.messages.map(msg => 
                msg.id === message.id 
                  ? { ...msg, status: 'read' }
                  : msg
              )
            }
          : conv
      ));
    }, 2000);

    toast.success("Message sent!");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleStarConversation = (conversationId: number) => {
    setConversations(prev => prev.map(conv => 
      conv.id === conversationId 
        ? { ...conv, hasStar: !conv.hasStar }
        : conv
    ));
    toast.success(selectedConversation?.hasStar ? "Removed from starred" : "Added to starred");
  };

  const handleArchiveConversation = (conversationId: number) => {
    setConversations(prev => prev.map(conv => 
      conv.id === conversationId 
        ? { ...conv, isArchived: true }
        : conv
    ));
    toast.success("Conversation archived");
  };

  const handleDeleteConversation = (conversationId: number) => {
    setConversations(prev => prev.filter(conv => conv.id !== conversationId));
    if (selectedChat === conversationId) {
      setSelectedChat(null);
    }
    toast.success("Conversation deleted");
  };

  const handleMarkAsRead = (conversationId: number) => {
    setConversations(prev => prev.map(conv => 
      conv.id === conversationId 
        ? { ...conv, unreadCount: 0 }
        : conv
    ));
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'now';
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    if (diffInHours < 48) return 'a day ago';
    return `${Math.floor(diffInHours / 24)} days ago`;
  };

  const getMessageStatusIcon = (status: Message['status']) => {
    switch (status) {
      case 'sent':
        return <Check className="w-3 h-3 text-gray-400" />;
      case 'delivered':
        return <CheckCheck className="w-3 h-3 text-gray-400" />;
      case 'read':
        return <CheckCheck className="w-3 h-3 text-blue-500" />;
      default:
        return <Clock className="w-3 h-3 text-gray-400" />;
    }
  };

  return (
    <div className="flex h-[calc(100vh-200px)] bg-gray-50">
      {/* Conversations List */}
      <div className="w-1/3 bg-gray-100 flex flex-col">
        {/* Header */}
        <div className="p-4 bg-white border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-900">Conversations</h1>
        </div>

        {/* Search */}
        <div className="p-4 bg-white border-b border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="p-4 bg-white border-b border-gray-200">
          <div className="flex space-x-1">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 py-2 text-sm font-medium rounded-md flex items-center gap-2 ${
                activeTab === 'all' 
                  ? 'bg-[#16a34a] text-white' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              All
              <Badge className={`text-xs ${
                activeTab === 'all' 
                  ? 'bg-white text-[#16a34a]' 
                  : 'bg-gray-200 text-gray-600'
              }`}>
                {getTabCount('all')}
              </Badge>
            </button>
            <button
              onClick={() => setActiveTab('mine')}
              className={`px-3 py-2 text-sm font-medium rounded-md flex items-center gap-2 ${
                activeTab === 'mine' 
                  ? 'bg-[#16a34a] text-white' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Mine
              <Badge className={`text-xs ${
                activeTab === 'mine' 
                  ? 'bg-white text-[#16a34a]' 
                  : 'bg-gray-200 text-gray-600'
              }`}>
                {getTabCount('mine')}
              </Badge>
            </button>
            <button
              onClick={() => setActiveTab('new')}
              className={`px-3 py-2 text-sm font-medium rounded-md flex items-center gap-2 ${
                activeTab === 'new' 
                  ? 'bg-[#16a34a] text-white' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              New
              <Badge className={`text-xs ${
                activeTab === 'new' 
                  ? 'bg-white text-[#16a34a]' 
                  : 'bg-gray-200 text-gray-600'
              }`}>
                {getTabCount('new')}
              </Badge>
            </button>
          </div>
        </div>

        {/* Conversations List */}
        <div className="flex-1 overflow-y-auto">
          {filteredConversations.map((conversation) => (
            <div
              key={conversation.id}
              className={`p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50 ${
                selectedChat === conversation.id ? 'bg-blue-50' : ''
              }`}
              onClick={() => {
                setSelectedChat(conversation.id);
                handleMarkAsRead(conversation.id);
              }}
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Avatar className="w-10 h-10 bg-gray-300">
                    <AvatarFallback className="bg-gray-400 text-white text-sm">
                      {getInitials(conversation.name)}
                    </AvatarFallback>
                  </Avatar>
                  {conversation.hasStar && (
                    <div className="absolute -top-1 -right-1">
                      <Star className="w-3 h-3 text-yellow-500 fill-current" />
                    </div>
                  )}
                  {conversation.unreadCount > 0 && (
                    <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {conversation.unreadCount}
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-gray-900 truncate text-sm">
                      {conversation.name}
                    </h3>
                    <span className="text-xs text-gray-500 ml-2">
                      {formatTime(conversation.timestamp)}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 truncate mt-1">
                    {conversation.lastMessage}
                  </p>
                  <div className="mt-2 flex justify-end">
                    {conversation.replyStatus === 'expired' ? (
                      <Button 
                        size="sm" 
                        className="bg-red-500 hover:bg-red-600 text-white text-xs px-2 py-1 h-auto"
                      >
                        YOU CAN NO LONGER REPLY!
                      </Button>
                    ) : (
                      <Button 
                        size="sm" 
                        className="bg-[#16a34a] hover:bg-[#15803d] text-white text-xs px-2 py-1 h-auto"
                      >
                        {conversation.hoursLeft} HOURS LEFT TO REPLY
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 bg-white flex flex-col">
        {selectedConversation ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200 bg-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="w-10 h-10 bg-gray-300">
                    <AvatarFallback className="bg-gray-400 text-white text-sm">
                      {getInitials(selectedConversation.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-gray-900">{selectedConversation.name}</h3>
                    <p className="text-sm text-gray-500">{selectedConversation.phone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Phone className="w-4 h-4 mr-2" />
                    Call
                  </Button>
                  <Button variant="outline" size="sm">
                    <Video className="w-4 h-4 mr-2" />
                    Video
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={() => handleStarConversation(selectedConversation.id)}>
                        <Star className="w-4 h-4 mr-2" />
                        {selectedConversation.hasStar ? 'Remove Star' : 'Star Chat'}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleArchiveConversation(selectedConversation.id)}>
                        <Archive className="w-4 h-4 mr-2" />
                        Archive
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        className="text-red-600"
                        onClick={() => handleDeleteConversation(selectedConversation.id)}
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 p-4 bg-gray-50 overflow-y-auto">
              <div className="space-y-4">
                {selectedConversation.messages.map((message) => (
                  <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-xs p-3 rounded-lg ${
                      message.sender === 'user' 
                        ? 'bg-[#16a34a] text-white' 
                        : 'bg-white shadow-sm'
                    }`}>
                      <p className="text-sm">{message.content}</p>
                      <div className={`flex items-center justify-end gap-1 mt-1 ${
                        message.sender === 'user' ? 'text-white/75' : 'text-gray-500'
                      }`}>
                        <span className="text-xs">{formatTime(message.timestamp)}</span>
                        {message.sender === 'user' && getMessageStatusIcon(message.status)}
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-gray-200 bg-white">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Paperclip className="w-4 h-4" />
                </Button>
                <div className="flex-1 relative">
                  <Textarea
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="min-h-[40px] max-h-[120px] resize-none"
                    rows={1}
                  />
                </div>
                <Button variant="outline" size="sm">
                  <Smile className="w-4 h-4" />
                </Button>
                <Button 
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                  className="bg-[#16a34a] hover:bg-[#15803d] text-white"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center text-gray-500">
              <p className="text-lg">Select a conversation to view messages</p>
            </div>
          </div>
        )}
        
        {/* Floating Action Button */}
        <div className="absolute bottom-6 right-6">
          <Button 
            size="sm" 
            className="w-10 h-10 bg-gray-800 hover:bg-gray-900 text-yellow-400 p-0"
          >
            <Star className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatsInbox;
