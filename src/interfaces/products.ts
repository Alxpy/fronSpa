export interface IProduct {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl?: string;
  status: boolean
  stock: number;
  owner_id: string;
}

export interface PCreateProduct {
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl?: string;
  stock: number;
  supplier: string;
}