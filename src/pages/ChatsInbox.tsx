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
  Copy,
  MessageSquare
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
    <div className="page-container">
      <div className="flex h-[calc(100vh-120px)] bg-white rounded-lg overflow-hidden shadow-lg border border-gray-200">
        {/* Conversations List */}
        <div className="w-1/3 bg-white flex flex-col border-r border-gray-200">
          {/* Header */}
          <div className="p-6 bg-black border-b border-gray-200">
            <h1 className="text-2xl font-bold text-white tracking-tight">Conversations</h1>
            <p className="text-gray-300 text-sm mt-1">Manage your WhatsApp conversations</p>
          </div>

          {/* Search */}
          <div className="p-6 bg-white border-b border-gray-200">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search conversations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 bg-white border-gray-300 focus:border-black focus:ring-black/20 rounded-lg"
              />
            </div>
          </div>

          {/* Tabs */}
          <div className="p-6 bg-white border-b border-gray-200">
            <div className="flex space-x-2">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-4 py-2.5 text-sm font-semibold rounded-lg flex items-center gap-2 transition-all duration-200 ${
                  activeTab === 'all' 
                    ? 'bg-black text-white' 
                    : 'text-gray-600 hover:text-black hover:bg-gray-100'
                }`}
              >
                All
                <Badge className={`text-xs font-medium ${
                  activeTab === 'all' 
                    ? 'bg-white/20 text-white border-white/30' 
                    : 'bg-slate-200 text-slate-600'
                }`}>
                  {getTabCount('all')}
                </Badge>
              </button>
              <button
                onClick={() => setActiveTab('mine')}
                className={`px-4 py-2.5 text-sm font-semibold rounded-lg flex items-center gap-2 transition-all duration-200 ${
                  activeTab === 'mine' 
                    ? 'bg-black text-white shadow-lg' 
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                }`}
              >
                Mine
                <Badge className={`text-xs font-medium ${
                  activeTab === 'mine' 
                    ? 'bg-white/20 text-white border-white/30' 
                    : 'bg-slate-200 text-slate-600'
                }`}>
                  {getTabCount('mine')}
                </Badge>
              </button>
              <button
                onClick={() => setActiveTab('new')}
                className={`px-4 py-2.5 text-sm font-semibold rounded-lg flex items-center gap-2 transition-all duration-200 ${
                  activeTab === 'new' 
                    ? 'bg-black text-white shadow-lg' 
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                }`}
              >
                New
                <Badge className={`text-xs font-medium ${
                  activeTab === 'new' 
                    ? 'bg-white/20 text-white border-white/30' 
                    : 'bg-slate-200 text-slate-600'
                }`}>
                  {getTabCount('new')}
                </Badge>
              </button>
            </div>
          </div>

          {/* Conversations List */}
          <div className="flex-1 overflow-y-auto bg-white/40 backdrop-blur-sm">
            {filteredConversations.length === 0 ? (
              <div className="flex items-center justify-center h-full text-slate-500">
                <div className="text-center">
                  <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MessageSquare className="w-8 h-8 text-slate-400" />
                  </div>
                  <p className="text-sm font-medium">No conversations found</p>
                  <p className="text-xs mt-1 text-slate-400">Try adjusting your search or filters</p>
                </div>
              </div>
            ) : (
              filteredConversations.map((conversation) => (
                <div
                  key={conversation.id}
                  className={`p-5 border-b border-slate-100 cursor-pointer hover:bg-white/60 transition-all duration-200 ${
                    selectedChat === conversation.id ? 'bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-l-blue-500 shadow-sm' : ''
                  }`}
                  onClick={() => {
                    setSelectedChat(conversation.id);
                    handleMarkAsRead(conversation.id);
                  }}
                >
                  <div className="flex items-start gap-4">
                    <div className="relative flex-shrink-0">
                      <Avatar className="w-14 h-14 bg-gradient-to-br from-slate-700 to-slate-800 shadow-lg">
                        <AvatarFallback className="bg-gradient-to-br from-slate-700 to-slate-800 text-white text-sm font-bold">
                          {getInitials(conversation.name)}
                        </AvatarFallback>
                      </Avatar>
                      {conversation.hasStar && (
                        <div className="absolute -top-1 -right-1 bg-yellow-400 rounded-full p-1 shadow-lg">
                          <Star className="w-3 h-3 text-yellow-600 fill-current" />
                        </div>
                      )}
                      {conversation.unreadCount > 0 && (
                        <div className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold shadow-lg">
                          {conversation.unreadCount}
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-bold text-slate-900 truncate text-base">
                          {conversation.name}
                        </h3>
                        <span className="text-xs text-slate-500 ml-2 flex-shrink-0 font-medium">
                          {formatTime(conversation.timestamp)}
                        </span>
                      </div>
                      <p className="text-sm text-slate-600 truncate mb-3 leading-relaxed">
                        {conversation.lastMessage}
                      </p>
                      <div className="flex justify-end">
                        {conversation.replyStatus === 'expired' ? (
                          <Badge variant="destructive" className="text-xs px-3 py-1.5 font-semibold rounded-full shadow-sm">
                            EXPIRED
                          </Badge>
                        ) : (
                          <Badge className="bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-600 hover:to-slate-700 text-white text-xs px-3 py-1.5 font-semibold rounded-full shadow-sm">
                            {conversation.hoursLeft}h LEFT
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 bg-gradient-to-br from-white to-slate-50 flex flex-col">
          {selectedConversation ? (
            <>
              {/* Chat Header */}
              <div className="p-6 border-b border-slate-200 bg-gradient-to-r from-slate-800 to-slate-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Avatar className="w-14 h-14 bg-gradient-to-br from-slate-700 to-slate-800 shadow-lg">
                      <AvatarFallback className="bg-gradient-to-br from-slate-700 to-slate-800 text-white text-sm font-bold">
                        {getInitials(selectedConversation.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-bold text-white text-lg">{selectedConversation.name}</h3>
                      <p className="text-sm text-slate-300">{selectedConversation.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Button variant="outline" size="sm" className="flex items-center gap-2 bg-white/10 border-white/20 text-white hover:bg-white/20 hover:border-white/30">
                      <Phone className="w-4 h-4" />
                      Call
                    </Button>
                    <Button variant="outline" size="sm" className="flex items-center gap-2 bg-white/10 border-white/20 text-white hover:bg-white/20 hover:border-white/30">
                      <Video className="w-4 h-4" />
                      Video
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm" className="bg-white/10 border-white/20 text-white hover:bg-white/20 hover:border-white/30">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
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
              <div className="flex-1 p-6 bg-gradient-to-b from-slate-50 to-white overflow-y-auto">
                <div className="space-y-6 max-w-4xl mx-auto">
                  {selectedConversation.messages.map((message) => (
                    <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-xs lg:max-w-md p-4 rounded-2xl shadow-lg ${
                        message.sender === 'user' 
                          ? 'bg-black text-white' 
                          : 'bg-white shadow-lg border border-slate-200'
                      }`}>
                        <p className="text-sm leading-relaxed font-medium">{message.content}</p>
                        <div className={`flex items-center justify-end gap-2 mt-3 ${
                          message.sender === 'user' ? 'text-slate-200' : 'text-slate-500'
                        }`}>
                          <span className="text-xs font-medium">{formatTime(message.timestamp)}</span>
                          {message.sender === 'user' && getMessageStatusIcon(message.status)}
                        </div>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              </div>

              {/* Message Input */}
              <div className="p-6 border-t border-slate-200 bg-gradient-to-r from-white to-slate-50">
                <div className="flex items-end gap-3 max-w-4xl mx-auto">
                  <Button variant="outline" size="sm" className="flex-shrink-0 bg-white border-slate-300 hover:bg-slate-50 shadow-sm">
                    <Paperclip className="w-4 h-4" />
                  </Button>
                  <div className="flex-1 relative">
                    <Textarea
                      placeholder="Type your message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="min-h-[48px] max-h-[120px] resize-none pr-12 bg-white border-slate-300 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl shadow-sm"
                      rows={1}
                    />
                  </div>
                  <Button variant="outline" size="sm" className="flex-shrink-0 bg-white border-slate-300 hover:bg-slate-50 shadow-sm">
                    <Smile className="w-4 h-4" />
                  </Button>
                  <Button 
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                    className="bg-black hover:bg-gray-800 text-white flex-shrink-0 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-full bg-gradient-to-br from-slate-50 to-slate-100">
              <div className="text-center text-slate-600">
                <div className="w-20 h-20 bg-gradient-to-br from-slate-100 to-slate-200 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <MessageSquare className="w-10 h-10 text-slate-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Select a conversation</h3>
                <p className="text-sm text-slate-500 max-w-sm">Choose a conversation from the list to start messaging and manage your WhatsApp communications</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatsInbox;
