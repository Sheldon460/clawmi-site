// ========================================
// User Types
// ========================================
export interface User {
  id: string;
  email: string;
  name?: string;
  username?: string;
  avatar?: string;
  bio?: string;
  role: 'USER' | 'ADMIN' | 'MODERATOR';
  createdAt: Date;
  updatedAt: Date;
}

// ========================================
// Chat & Conversation Types
// ========================================
export interface Conversation {
  id: string;
  userId?: string;
  title?: string;
  isPublic: boolean;
  shareSlug?: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Message {
  id: string;
  conversationId: string;
  role: 'USER' | 'ASSISTANT' | 'SYSTEM';
  content: string;
  model?: string;
  tokensUsed?: number;
  audioUrl?: string;
  createdAt: Date;
}

// ========================================
// Shop & Product Types
// ========================================
export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDesc?: string;
  price: number;
  salePrice?: number;
  type: 'DIGITAL' | 'SERVICE' | 'SUBSCRIPTION' | 'SKILL_PACK';
  status: 'DRAFT' | 'ACTIVE' | 'ARCHIVED' | 'OUT_OF_STOCK';
  image?: string;
  downloadUrl?: string;
  licenseKey?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Order {
  id: string;
  userId: string;
  orderNumber: string;
  status: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'CANCELLED' | 'REFUNDED';
  totalAmount: number;
  currency: string;
  paymentMethod?: string;
  paymentIntentId?: string;
  paidAt?: Date;
  items: OrderItem[];
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  licenseKey?: string;
  downloadCount: number;
  product?: Product;
}

// ========================================
// Guestbook Types
// ========================================
export interface GuestbookEntry {
  id: string;
  userId?: string;
  authorName: string;
  authorEmail?: string;
  authorWebsite?: string;
  content: string;
  isPublic: boolean;
  isApproved: boolean;
  likes: number;
  parentId?: string;
  replies?: GuestbookEntry[];
  ipAddress?: string;
  userAgent?: string;
  createdAt: Date;
  updatedAt: Date;
}

// ========================================
// API Response Types
// ========================================
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
    hasMore?: boolean;
  };
}

// ========================================
// Theme & UI Types
// ========================================
export type Theme = 'light' | 'dark' | 'system';

export interface NavItem {
  label: string;
  href: string;
  icon?: string;
  children?: NavItem[];
}

// ========================================
// AI Model Types
// ========================================
export interface AIModel {
  id: string;
  name: string;
  provider: 'openai' | 'anthropic' | 'google' | 'local';
  maxTokens: number;
  supportsVision: boolean;
  supportsAudio: boolean;
  icon?: string;
}

// ========================================
// Payment Types
// ========================================
export interface PaymentIntent {
  id: string;
  clientSecret: string;
  amount: number;
  currency: string;
  status: 'requires_payment_method' | 'requires_confirmation' | 'succeeded' | 'canceled';
}
