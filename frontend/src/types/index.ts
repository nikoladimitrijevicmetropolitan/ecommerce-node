export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  stock: number;
  createdAt: string;
  updatedAt: string;
}

export type CartItem = Product & {
  quantity: number;
}

export const DUMMY_TYPE = true;
