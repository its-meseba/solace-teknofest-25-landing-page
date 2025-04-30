'use client';

import { useState, useRef, useEffect } from 'react';
import { useChat } from '@ai-sdk/react';
import { Button } from '@/registry/new-york-v4/ui/button';
import { Textarea } from '@/registry/new-york-v4/ui/textarea';
import { Card } from '@/registry/new-york-v4/ui/card';
import { SendIcon, BookOpen, RefreshCw, Zap, Sparkles, AlertCircle, Key, Loader2, XIcon, MenuIcon, CopyIcon, Check, ExternalLink, Pencil, Trash2, Database } from 'lucide-react';
import { useAuth } from '@/context/auth-context';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { useRouter } from 'next/navigation';
import { Badge } from '@/registry/new-york-v4/ui/badge';
import { Progress } from '@/registry/new-york-v4/ui/progress';
import { Sheet, SheetContent, SheetTrigger } from '@/registry/new-york-v4/ui/sheet';
import { Separator } from '@/registry/new-york-v4/ui/separator';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/registry/new-york-v4/ui/tooltip";
import { useToast } from '@/registry/new-york-v4/ui/use-toast';
import { 
  getUserChatSessions, 
  createChatSession, 
  updateChatSessionTitle, 
  deleteChatSession,
  saveChatMessage,
  getChatSessionMessages,
  batchSaveChatMessages,
  ChatSession as FirebaseChatSession,
  ChatMessage as FirebaseChatMessage
} from '@/lib/firebase-utils';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/registry/new-york-v4/ui/dialog";
import { Input } from '@/registry/new-york-v4/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/registry/new-york-v4/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/registry/new-york-v4/ui/alert-dialog";
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

// The modified Message type that ignores TypeScript errors for now
// In a production environment, you would define proper types
interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant' | 'system' | 'data';
  createdAt?: Date;
  toolInvocations?: any[]; // Use any[] to avoid typechecking issues
}

interface Source {
  title: string;
  url: string;
  contentType: 'video' | 'blog';
}

interface ChatSession {
  id: string;
  title: string;
  updatedAt: Date;
}

interface AiChatMainProps {
  apiKey?: string | null;
  userId?: string;
  hasSubscription?: boolean;
  pineconeApiKey?: string | null;
  pineconeIndexName?: string | null;
}

export function AiChatMain({ apiKey, userId, hasSubscription, pineconeApiKey, pineconeIndexName }: AiChatMainProps) {
  const { userData } = useAuth();
  const router = useRouter();
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [isComposing, setIsComposing] = useState(false);
  const [freeQueriesRemaining, setFreeQueriesRemaining] = useState(5);
  const [showUpgradePrompt, setShowUpgradePrompt] = useState(false);
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const { toast } = useToast();
  const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null);
  const [hoveredLinkUrl, setHoveredLinkUrl] = useState<string | null>(null);
  const [linkPreviewContent, setLinkPreviewContent] = useState<string | null>(null);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const [sessionToRename, setSessionToRename] = useState<ChatSession | null>(null); 
  const [newTitle, setNewTitle] = useState('');
  const [sessionToDelete, setSessionToDelete] = useState<string | null>(null);
  const [isCreatingNewSession, setIsCreatingNewSession] = useState(false);
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);
  const [localStorageSynced, setLocalStorageSynced] = useState(false);
  const [currentChatMode, setCurrentChatMode] = useState<'standard' | 'rag' | null>(null);
  
  // Create a real function for loading chat sessions instead of using a ref
  const loadChatSessions = async () => {
    if (!userId) return;
    
    try {
      setIsLoadingHistory(true);
      const sessions = await getUserChatSessions(userId);
      
      setChatSessions(sessions.map(session => ({
        id: session.id,
        title: session.title,
        updatedAt: session.updatedAt
      })));
      
    } catch (error) {
      console.error('Error loading chat sessions:', error);
      toast({
        title: 'Error loading chat history',
        description: 'There was a problem connecting to the server. Your chat history may not be available.',
        variant: 'destructive'
      });
      setChatSessions([]);
    } finally {
      setIsLoadingHistory(false);
    }
  };

  // Load chat sessions once when the component mounts or userId changes
  useEffect(() => {
    if (userId) {
      loadChatSessions();
    }
  }, [userId, toast]); // Add toast to dependencies

  // Add a new function to update the local chat sessions list
  // This is more efficient than reloading all sessions from Firebase
  const addOrUpdateLocalChatSession = (sessionId: string, title: string, isNew = false) => {
    if (!sessionId) return;
    
    // Update the chat sessions array locally
    setChatSessions(prevSessions => {
      // Find if the session already exists
      const sessionIndex = prevSessions.findIndex(s => s.id === sessionId);
      const now = new Date();
      
      // If it's a new session or not found in the array, add it
      if (isNew || sessionIndex === -1) {
        return [
          {
            id: sessionId,
            title: title,
            updatedAt: now
          },
          ...prevSessions.filter(s => s.id !== sessionId) // Remove any duplicate (shouldn't happen)
        ];
      }
      
      // If the session exists, update it and move it to the top
      const updatedSessions = [...prevSessions];
      updatedSessions.splice(sessionIndex, 1); // Remove the existing session
      
      return [
        {
          id: sessionId,
          title: title,
          updatedAt: now
        },
        ...updatedSessions
      ];
    });
  };
  
  // Initialize the chat using AI SDK's useChat hook
  const { 
    messages, 
    input, 
    handleInputChange, 
    handleSubmit, 
    isLoading, 
    error, 
    reload,
    setMessages,
    append
  } = useChat({
    api: '/api/ai-chat',
    headers: {
      'x-api-key': apiKey || '',
      'x-user-id': userId || '',
      'x-pinecone-api-key': pineconeApiKey || '',
      'x-pinecone-index-name': pineconeIndexName || '',
    },
    id: currentSessionId || undefined,
    maxSteps: 3, // Enable multi-step tool calls for better UX
    onResponse: (response) => {
      // If the response is successful and we have a current session ID, update the session in Firebase
      if (response.ok && currentSessionId && userId) {
        // Update the updatedAt timestamp for the chat session to keep it current
        try {
          const sessionRef = doc(db, 'chat_history', currentSessionId);
          updateDoc(sessionRef, {
            updatedAt: new Date()
          }).then(() => {
            // Find the session title from current sessions
            const sessionTitle = chatSessions.find(s => s.id === currentSessionId)?.title || '';
            // Update locally instead of reloading from Firebase
            addOrUpdateLocalChatSession(currentSessionId, sessionTitle);
          }).catch(error => {
            console.error('Error updating chat session timestamp:', error);
          });
        } catch (error) {
          console.error('Error updating chat session timestamp:', error);
        }
      }
    },
    onFinish: async (message) => {
      // When the AI finishes a response, save the AI message to Firebase
      if (currentSessionId && userId) {
        try {
          await saveChatMessage(
            currentSessionId,
            message.content,
            'assistant'
          );
          
          // Find the session title from current sessions
          const sessionTitle = chatSessions.find(s => s.id === currentSessionId)?.title || '';
          // Update the local chat sessions list instead of reloading from Firebase
          addOrUpdateLocalChatSession(currentSessionId, sessionTitle);
        } catch (error) {
          console.error('Error saving AI message to Firebase:', error);
        }
      } else if (!currentSessionId && userId && messages.length > 0) {
        // Create a new session when the first message exchange is completed
        try {
          setIsCreatingNewSession(true);
          
          // Find the first user message to use as session title
          const firstUserMessage = messages.find(m => m.role === 'user');
          if (firstUserMessage) {
            // Create title from the first user message (first 30 chars or first sentence)
            const titleFromMessage = firstUserMessage.content.split('.')[0].trim();
            const title = titleFromMessage.length > 30 
              ? titleFromMessage.substring(0, 27) + '...' 
              : titleFromMessage;
            
            // Create a new session in Firebase
            const newSessionId = await createChatSession(
              userId,
              title,
              firstUserMessage.content
            );
            
            // Now batch save all existing messages
            const messagesToSave = messages.map(m => ({
              content: m.content,
              role: m.role as 'user' | 'assistant'
            }));
            
            await batchSaveChatMessages(newSessionId, messagesToSave);
            
            // Update state with the new session
            setCurrentSessionId(newSessionId);
            
            // Add the new session to the local chat sessions list
            addOrUpdateLocalChatSession(newSessionId, title, true);
          }
        } catch (error) {
          console.error('Error creating new chat session:', error);
          toast({
            title: 'Error saving chat',
            description: 'Failed to save chat history to the server.',
            variant: 'destructive'
          });
        } finally {
          setIsCreatingNewSession(false);
        }
      }
    }
  });
  
  // Update handleChatSubmit function to track chat mode
  const handleChatSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!input.trim() || isLoading) return;
    
    // Reset the current mode indicator when sending a new message
    setCurrentChatMode(null);
    
    // First check if user has free queries or subscription
    if (!hasSubscription) {
      // Check if user has any free queries left
      const remainingQueries = localStorage.getItem('free_ai_queries_remaining');
      const queriesLeft = remainingQueries ? parseInt(remainingQueries) : 0;
      
      if (queriesLeft <= 0) {
        // No more free queries
        setShowUpgradePrompt(true);
        return;
      }
      
      // Decrement the free queries count
      const newCount = queriesLeft - 1;
      localStorage.setItem('free_ai_queries_remaining', newCount.toString());
      setFreeQueriesRemaining(newCount);
    }
    
    try {
      // Create a new session if none exists
      let sessionId = currentSessionId;
      
      if (!sessionId && userId) {
        try {
          setIsCreatingNewSession(true);
          
          // Create a new session with the first message as the title
          const titleText = input.length > 50 ? input.substring(0, 50) + '...' : input;
          sessionId = await createChatSession(userId, titleText);
          
          console.log('Created new chat session with ID:', sessionId);
          setCurrentSessionId(sessionId);
          
          // Add the session to local state to avoid a database read
          addOrUpdateLocalChatSession(sessionId, titleText, true);
          
        } catch (error) {
          console.error('Error creating chat session:', error);
          toast({
            title: 'Error creating chat session',
            description: 'Your chat will not be saved. Please try again later.',
            variant: 'destructive'
          });
        } finally {
          setIsCreatingNewSession(false);
        }
      }
      
      // Add optimistic user message update
      const userMessage = {
        id: crypto.randomUUID(),
        content: input,
        role: 'user' as const,
        createdAt: new Date()
      };
      
      // Submit the form using AI SDK's handleSubmit
      await handleSubmit(e);
      
      // Save the user message to Firebase if we have a session ID
      if (sessionId && userId) {
        try {
          await saveChatMessage(
            sessionId,
            input,
            'user'
          );
        } catch (error) {
          console.error('Error saving message to Firebase:', error);
        }
      }
      
      // Watch for message updates to track RAG usage
      setTimeout(() => {
        // Find the last assistant message with tool invocations
        const lastAssistantMessage = [...messages].reverse()
          .find(msg => msg.role === 'assistant' && msg.toolInvocations);
          
        if (lastAssistantMessage) {
          // Check for assessQueryIntent tool usage
          const intentAnalysis = lastAssistantMessage.toolInvocations?.find(
            tool => tool.name === 'assessQueryIntent'
          );
          
          if (intentAnalysis?.output?.requiresRAG) {
            setCurrentChatMode('rag');
            console.log('Query requires RAG:', intentAnalysis.output);
          } else if (intentAnalysis?.output?.requiresRAG === false) {
            setCurrentChatMode('standard');
            console.log('Query uses standard mode:', intentAnalysis.output);
          }
          
          // Also check direct searchContent tool usage
          const searchContent = lastAssistantMessage.toolInvocations?.find(
            tool => tool.name === 'searchContent'
          );
          
          if (searchContent) {
            setCurrentChatMode('rag');
          }
        }
      }, 1000); // Check after a second to give time for tool calls to complete
      
    } catch (error) {
      console.error('Error in chat submission:', error);
      toast({
        title: 'Error sending message',
        description: 'Please try again later.',
        variant: 'destructive'
      });
    }
  };
  
  // Load free queries remaining from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Load chat history from localStorage (in a real app, this would come from the backend)
      const savedSessions = localStorage.getItem('chat_sessions');
      if (savedSessions && !userId) {
        setChatSessions(JSON.parse(savedSessions));
      }
      
      // Load remaining free queries
      if (!hasSubscription && !apiKey) {
        const remainingQueries = localStorage.getItem('free_ai_queries_remaining');
        if (remainingQueries) {
          setFreeQueriesRemaining(parseInt(remainingQueries));
        }
      }
    }
  }, [hasSubscription, apiKey, userId]);
  
  // Handle loading messages for a selected chat session
  const handleLoadSession = async (sessionId: string) => {
    if (!userId) {
      setCurrentSessionId(sessionId);
      setMessages([]);
      setIsMobileDrawerOpen(false);
      return;
    }
    
    try {
      setCurrentSessionId(sessionId);
      setIsLoadingMessages(true);
      
      // Fetch messages for this session from Firebase
      const chatMessages = await getChatSessionMessages(sessionId, userId);
      
      // Convert Firebase messages to the format expected by useChat
      const formattedMessages = chatMessages.map(message => ({
        id: message.id,
        content: message.content,
        role: message.role,
        createdAt: message.createdAt
      }));
      
      // Update the chat state with these messages
      setMessages(formattedMessages);
      
      // Check if we got any messages and show a notification if the session is empty
      if (chatMessages.length === 0) {
        // Find the session title to include in the message
        const sessionTitle = chatSessions.find(s => s.id === sessionId)?.title || 'this conversation';
        console.log(`No messages found for "${sessionTitle}". The session might be empty or messages may have been deleted.`);
      }
      
      setIsMobileDrawerOpen(false);
    } catch (error) {
      console.error('Error loading chat messages:', error);
      toast({
        title: 'Error loading messages',
        description: 'Could not retrieve the conversation messages. Please try again or start a new chat.',
        variant: 'destructive'
      });
      // Set empty messages to avoid breaking the UI
      setMessages([]);
    } finally {
      setIsLoadingMessages(false);
    }
  };
  
  // Create a new chat session
  const handleNewChat = () => {
    setCurrentSessionId(null);
    setMessages([]);
    setIsMobileDrawerOpen(false);
  };
  
  // Handle renaming a chat session
  const handleRenameSession = async () => {
    if (!sessionToRename || !userId || !newTitle.trim()) return;
    
    try {
      await updateChatSessionTitle(sessionToRename.id, newTitle.trim());
      
      // Update the local chat sessions list instead of reloading from Firebase
      addOrUpdateLocalChatSession(sessionToRename.id, newTitle.trim());
      
      toast({
        title: 'Chat renamed',
        description: 'Your chat has been successfully renamed.'
      });
    } catch (error) {
      console.error('Error renaming chat session:', error);
      toast({
        title: 'Error',
        description: 'Failed to rename chat. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setSessionToRename(null);
      setNewTitle('');
    }
  };
  
  // Handle deleting a chat session
  const handleDeleteSession = async () => {
    if (!sessionToDelete || !userId) return;
    
    try {
      await deleteChatSession(sessionToDelete, userId);
      
      // Update the local chat sessions list instead of reloading from Firebase
      setChatSessions(prevSessions => prevSessions.filter(session => session.id !== sessionToDelete));
      
      // If the deleted session was the current one, create a new chat
      if (currentSessionId === sessionToDelete) {
        handleNewChat();
      }
      
      toast({
        title: 'Chat deleted',
        description: 'Your chat has been successfully deleted.'
      });
    } catch (error) {
      console.error('Error deleting chat session:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete chat. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setSessionToDelete(null);
    }
  };
  
  // Update free queries when user sends a message
  useEffect(() => {
    // Show upgrade prompt after 3 messages
    if (messages.length >= 6 && !hasSubscription && !showUpgradePrompt) {
      setShowUpgradePrompt(true);
    }
    
    // Track message usage for free tier users
    if (messages.length > 0 && messages[messages.length - 1].role === 'user' && !hasSubscription && !apiKey) {
      // Decrement free queries remaining
      const newCount = Math.max(0, freeQueriesRemaining - 1);
      setFreeQueriesRemaining(newCount);
      localStorage.setItem('free_ai_queries_remaining', newCount.toString());
    }
    
    // Scroll to bottom when new messages arrive
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages, hasSubscription, apiKey, freeQueriesRemaining, showUpgradePrompt]);

  // Auto-scroll to the bottom of the chat when new messages arrive
  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Change the suggestions to be more specific and helpful
  const SUGGESTED_QUESTIONS = [
    "What's the best way to validate a business idea?",
    "How do I create an effective customer acquisition strategy?",
    "What tools should I use to create a minimum viable product?",
    "How can I find investors for my startup?",
    "What's the difference between bootstrapping and raising venture capital?"
  ];

  // Render empty state messaging
  const renderEmptyState = () => (
    <div className="text-center py-12">
      <Sparkles className="h-12 w-12 mb-4 mx-auto text-muted-foreground/30" />
      <h2 className="text-xl font-semibold mb-2">Your AI Research Assistant</h2>
      <p className="text-muted-foreground max-w-md mx-auto mb-6">
        Ask me anything about entrepreneurship, startup strategies, or our content library. I'll provide relevant answers and resources.
      </p>
      <div className="mt-6 grid gap-3 max-w-md mx-auto">
        {SUGGESTED_QUESTIONS.map((suggestion, i) => (
          <Button
            key={i}
            variant="outline"
            className="justify-start h-auto py-3 px-4 text-left hover:border-primary hover:text-primary"
            onClick={() => {
              if (textAreaRef.current) {
                textAreaRef.current.value = suggestion;
                const event = new Event('input', { bubbles: true });
                textAreaRef.current.dispatchEvent(event);
                handleInputChange({ 
                  target: { value: suggestion } 
                } as React.ChangeEvent<HTMLTextAreaElement>);
              }
            }}
          >
            <Sparkles className="h-4 w-4 mr-2 flex-shrink-0" />
            <span>{suggestion}</span>
          </Button>
        ))}
      </div>
    </div>
  );

  // Function to handle copying message content
  const handleCopyMessage = (messageId: string, content: string) => {
    navigator.clipboard.writeText(content).then(() => {
      setCopiedMessageId(messageId);
      toast({
        title: 'Copied to clipboard',
        description: 'Message content has been copied to your clipboard.',
      });
      setTimeout(() => setCopiedMessageId(null), 2000);
    });
  };

  // Function to format message content with ReactMarkdown
  const formatMessageContent = (content: string, role: 'user' | 'assistant') => {
    if (role === 'user') {
      return <div className="whitespace-pre-wrap">{content}</div>;
    }
    
    return (
      <div className="prose prose-sm dark:prose-invert max-w-none break-words">
        <ReactMarkdown
          components={{
            a: ({ node, ...props }) => {
              return (
                <TooltipProvider delayDuration={300}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <a 
                        {...props} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary underline underline-offset-2 inline-flex items-center"
                        onMouseEnter={() => setHoveredLinkUrl(props.href || null)}
                        onMouseLeave={() => setHoveredLinkUrl(null)}
                      >
                        {props.children}
                        <ExternalLink className="h-3 w-3 ml-1" />
                      </a>
                    </TooltipTrigger>
                    <TooltipContent side="top" align="center">
                      {props.href}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              );
            },
            code: ({ node, className, children, ...props }: any) => {
              const match = /language-(\w+)/.exec(className || '');
              const isInline = !match && (children?.toString()?.split('\n').length === 1);
              
              if (isInline) {
                return (
                  <code className="bg-muted px-1 py-0.5 rounded text-sm" {...props}>
                    {children}
                  </code>
                );
              }
              
              return (
                <div className="relative my-2 rounded-md bg-muted/50 p-0">
                  <div className="overflow-x-auto p-4">
                    <code className="text-sm" {...props}>
                      {children}
                    </code>
                  </div>
                </div>
              );
            },
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    );
  };

  // Function to format error messages for better display
  const formatErrorMessage = (error: Error) => {
    const message = error.message;
    
    if (message.includes('API key')) {
      return "Invalid or missing API key. Please check your API key in your profile settings.";
    }
    
    if (message.includes('401')) {
      return "Authentication error. Your API key may have expired or been revoked.";
    }
    
    if (message.includes('429')) {
      return "You've reached the rate limit for AI requests. Please wait a moment before trying again.";
    }
    
    if (message.includes('500')) {
      return "Server error. Our AI service is experiencing issues. Please try again later.";
    }
    
    return message || "An error occurred. Please try again.";
  };

  // Adjust textarea height as user types
  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    handleInputChange(e);
    
    // Reset height to auto to get the correct scrollHeight
    if (textAreaRef.current) {
      textAreaRef.current.style.height = 'auto';
      // Set new height based on scrollHeight up to max 200px
      const newHeight = Math.min(textAreaRef.current.scrollHeight, 200);
      textAreaRef.current.style.height = `${newHeight}px`;
    }
  };

  // Detect when user is using IME composition (for languages like Japanese, Chinese)
  const handleCompositionStart = () => setIsComposing(true);
  const handleCompositionEnd = () => setIsComposing(false);

  // Handle form submission with Enter key (but not when shift is pressed)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey && !isComposing) {
      e.preventDefault();
      // Prevent sending if no free queries and not premium
      if (freeQueriesRemaining <= 0 && !hasSubscription && !apiKey) {
        setShowUpgradePrompt(true);
        return;
      }
      const form = e.currentTarget.form;
      if (form) form.requestSubmit();
    }
  };

  // Render a chat session item with rename/delete options
  const renderChatSessionItem = (session: ChatSession) => {
    return (
      <div
        key={session.id}
        className={cn(
          "group flex items-center justify-between pr-2 rounded-md",
          currentSessionId === session.id ? "bg-secondary" : "hover:bg-muted"
        )}
      >
        <Button
          variant={currentSessionId === session.id ? "secondary" : "ghost"}
          className="w-full justify-start text-sm h-auto py-2 px-3 font-normal overflow-hidden"
          onClick={() => handleLoadSession(session.id)}
        >
          <div className="truncate text-left">
            <span>{session.title}</span>
          </div>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-7 w-7 opacity-0 group-hover:opacity-100"
            >
              <span className="sr-only">More options</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-more-vertical"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></svg>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem 
              onClick={() => {
                setSessionToRename(session);
                setNewTitle(session.title);
              }}
            >
              <Pencil className="h-4 w-4 mr-2" />
              Rename
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="text-destructive focus:text-destructive"
              onClick={() => setSessionToDelete(session.id)}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  };

  // Render the free query usage section
  const renderUsageSection = () => {
    if (hasSubscription) {
      return (
        <div className="flex items-center gap-2 text-xs text-primary">
          <Badge variant="outline" className="bg-primary/5 border-primary/20 text-primary gap-1 py-0">
            <Sparkles className="h-3 w-3" />
            <span>Premium</span>
          </Badge>
          <span>Unlimited access</span>
        </div>
      );
    }
    
    if (apiKey) {
      return (
        <div className="flex items-center gap-2 text-xs">
          <Badge variant="outline" className="gap-1 py-0">
            <Key className="h-3 w-3" />
            <span>API Key</span>
          </Badge>
        </div>
      );
    }
    
    // Free tier usage indicator
    return (
      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">Free queries remaining:</span>
          <span className={freeQueriesRemaining <= 1 ? "text-destructive font-medium" : ""}>
            {freeQueriesRemaining} / 5
          </span>
        </div>
        <Progress value={freeQueriesRemaining * 20} className="h-1" />
      </div>
    );
  };

  // Add a utility function to determine if a message used RAG
  const didMessageUseRAG = (message: any) => {
    if (message.role !== 'assistant' || !message.toolInvocations) return false;
    
    // Check if the message used the searchContent tool
    return message.toolInvocations.some(
      (tool: any) => tool.name === 'searchContent'
    );
  };

  // Watch for message updates to track RAG usage
  useEffect(() => {
    if (messages.length > 0) {
      // Find the last assistant message
      const lastAssistantMessage = [...messages].reverse().find(msg => msg.role === 'assistant');
      
      if (lastAssistantMessage?.toolInvocations) {
        // Check for searchContent tool usage
        const usedSearchContent = lastAssistantMessage.toolInvocations.some(
          (tool: any) => tool.name === 'searchContent'
        );
        
        if (usedSearchContent) {
          setCurrentChatMode('rag');
        } else {
          const assistantContent = lastAssistantMessage.content || '';
          // If no search tool was used but the message is substantial, assume standard mode
          if (assistantContent.length > 20) {
            setCurrentChatMode('standard');
          }
        }
      }
    }
  }, [messages]);

  // Update renderMessageItem function to show RAG indicator
  const renderMessageItem = (message: Message) => (
    <motion.div
      key={message.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "py-4 flex items-start gap-3",
        message.role === 'user' ? "justify-end" : "justify-start"
      )}
    >
      {/* User message */}
      {message.role === 'user' && (
        <div className="flex items-start gap-3 max-w-[80%]">
          <div className="order-2 bg-primary text-primary-foreground rounded-lg px-4 py-2 shadow-sm">
            <p className="whitespace-pre-wrap">{message.content}</p>
          </div>
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
            {userData?.displayName?.[0]?.toUpperCase() || 'U'}
          </div>
        </div>
      )}
      
      {/* AI message */}
      {message.role === 'assistant' && (
        <div className="flex items-start gap-3 max-w-[80%]">
          <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
            <Sparkles className="h-4 w-4 text-foreground" />
          </div>
          <div className="relative bg-muted rounded-lg px-4 py-3 shadow-sm">
            {didMessageUseRAG(message) && (
              <div className="absolute -top-2 -right-2 bg-primary/10 text-primary rounded-full p-1" title="This response used Retrieval Augmented Generation">
                <Database className="h-3.5 w-3.5" />
              </div>
            )}
            <div className="whitespace-pre-wrap prose prose-sm dark:prose-invert prose-p:my-1 prose-headings:mb-1 prose-headings:mt-3 leading-normal max-w-none">
              {formatMessageContent(message.content, 'assistant')}
            </div>
            <div className="flex items-center justify-end mt-2 gap-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 rounded-full opacity-70 hover:opacity-100"
                      onClick={() => handleCopyMessage(message.id, message.content)}
                    >
                      {copiedMessageId === message.id ? 
                        <Check className="h-3 w-3" /> : 
                        <CopyIcon className="h-3 w-3" />
                      }
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs">Copy message</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );

  // Add a chat mode indicator in the header
  const renderChatHeader = () => (
    <div className="border-b px-4 py-2 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Sparkles className="h-4 w-4 text-primary" />
        <h2 className="text-sm font-medium">AI Chat</h2>
        {currentChatMode && (
          <Badge variant="outline" className={cn(
            "text-xs",
            currentChatMode === 'rag' ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
          )}>
            {currentChatMode === 'rag' ? (
              <span className="flex items-center gap-1">
                <Database className="h-3 w-3" /> 
                RAG Mode
              </span>
            ) : (
              <span className="flex items-center gap-1">
                <Sparkles className="h-3 w-3" /> 
                Standard Mode
              </span>
            )}
          </Badge>
        )}
      </div>
      
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={handleNewChat}
          disabled={isLoading || isCreatingNewSession}
        >
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="flex items-center">
                  <RefreshCw className="h-4 w-4" />
                </span>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs">New Chat</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </Button>
      </div>
    </div>
  );

  return (
    <div className="flex h-full">
      {/* Sidebar for chat history */}
      <Sheet open={isMobileDrawerOpen} onOpenChange={setIsMobileDrawerOpen}>
        <SheetContent side="left" className="p-0 w-80">
          <div className="h-full flex flex-col">
            <div className="p-4 border-b">
              <h2 className="text-lg font-semibold mb-1">Chat History</h2>
              <p className="text-sm text-muted-foreground">Your previous conversations</p>
            </div>
            
            <div className="flex-1 overflow-auto p-3">
              {isLoadingHistory ? (
                <div className="flex items-center justify-center h-20">
                  <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                </div>
              ) : chatSessions.length === 0 ? (
                <div className="text-center py-8 text-sm text-muted-foreground">
                  <p>No chat history yet</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {chatSessions.map(renderChatSessionItem)}
                </div>
              )}
            </div>
            
            <div className="p-3 border-t">
              <Button 
                variant="outline" 
                className="w-full justify-start" 
                onClick={handleNewChat}
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                New Chat
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
      
      {/* Main chat area */}
      <div className="flex-1 flex flex-col h-full">
        {/* Chat header with mode indicator */}
        {renderChatHeader()}
        
        {/* Messages container */}
        <div 
          ref={messagesContainerRef}
          className="flex-1 overflow-auto px-4 py-2"
        >
          {messages.length === 0 ? (
            renderEmptyState()
          ) : (
            <div className="pb-20 pt-5">
              {messages.map(renderMessageItem)}
              
              {isLoading && (
                <div className="flex items-center justify-center py-4">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <Loader2 className="h-5 w-5 text-primary" />
                  </motion.div>
                </div>
              )}
              
              {error && (
                <div className="flex items-start gap-3 max-w-full my-4">
                  <div className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center">
                    <AlertCircle className="h-4 w-4 text-red-500 dark:text-red-300" />
                  </div>
                  <div className="bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded-lg px-4 py-3 shadow-sm">
                    <h4 className="font-medium mb-1">Error</h4>
                    <p className="text-sm">{formatErrorMessage(error)}</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        
        {/* Input area */}
        <div className="border-t p-4">
          <form onSubmit={handleChatSubmit} className="relative">
            <Textarea
              ref={textAreaRef}
              value={input}
              onChange={handleTextAreaChange}
              onCompositionStart={handleCompositionStart}
              onCompositionEnd={handleCompositionEnd}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              className="w-full pr-10 resize-none max-h-32 overflow-y-auto"
              rows={1}
              disabled={isLoading || showUpgradePrompt}
            />
            <Button 
              type="submit" 
              size="icon" 
              variant="ghost" 
              className="absolute bottom-1.5 right-1.5 text-primary bg-primary/10 hover:bg-primary/20"
              disabled={!input.trim() || isLoading || showUpgradePrompt}
            >
              <SendIcon className="h-4 w-4" />
            </Button>
          </form>
          
          {!hasSubscription && renderUsageSection()}
        </div>
      </div>
    </div>
  );
} 