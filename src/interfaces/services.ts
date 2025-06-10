export interface IService {
  _id: string;
  name: string;
  description: string;
  price: number;
  duration: number;
  image: string | null;
  category: 'belleza' | 'relajacion' | 'salud' | 'otro';
  isActive: boolean;
}

export interface PCreateService {
  name: string;
  description: string;
  price: number;
  image?: string;
  duration: number;
  category: string;
}