export interface Supplier {
  _id: string;
  name: string;
  description: string;
  email: string;
  phone: string;
  address: string;
  createdAt: string;
  updatedAt: string;
}

export interface PCreateSupplier {
  name: string;
  description: string;
  email: string;
  phone: string;
  address: string;
}