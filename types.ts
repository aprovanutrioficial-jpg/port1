export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  rating: number;
  reviews: number;
  imageUrl: string;
  category: string;
  checkoutUrl?: string;
}

export interface Review {
  id: string;
  userName: string;
  rating: number;
  date: string;
  content: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export type SortOption = 'price-asc' | 'price-desc' | 'rating' | 'newest';

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isProductRecommendation?: boolean;
}