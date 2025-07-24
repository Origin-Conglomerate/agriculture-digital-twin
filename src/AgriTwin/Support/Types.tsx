// types.ts
export interface Ticket {
    id: string;
    title: string;
    description: string;
    status: 'new' | 'open' | 'in-progress' | 'resolved' | 'closed';
    priority: 'low' | 'medium' | 'high' | 'urgent';
    category: 'technical' | 'billing' | 'general' | 'feature' | 'bug';
    createdAt: Date;
    updatedAt: Date;
    assignedTo?: string;
    attachments?: string[];
  }
  
  export interface FaqItem {
    question: string;
    answer: string;
    category: string;
  }
  
  export interface ChatMessage {
    id: string;
    content: string;
    sender: 'user' | 'support';
    timestamp: Date;
  }
  
  export interface KnowledgeBaseArticle {
    id: string;
    title: string;
    content: string;
    category: string;
    tags: string[];
  }