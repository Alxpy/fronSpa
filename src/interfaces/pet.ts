export interface IPet {
  _id: string;
  name: string;
  species: string;
  breed: string;
  age: number;
  weight: number;
  note?: string;
  image?: string;
  owner: string;
  createdAt: string;
  updatedAt: string;
}

export interface PCreatePet {
  name: string;
  species: string;
  breed: string;
  age: number;
  weight: number;
  note?: string;
  image?: File | null;
}