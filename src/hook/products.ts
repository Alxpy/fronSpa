import { useMutation, useQuery } from "@tanstack/react-query";
import axios from '@/lib/axios';
import type { IProduct, PCreateProduct } from "@/interfaces/products";
import { queryClient } from "@/client";

export const useGetProducts = () => {
  return useQuery<IProduct[]>({
    queryKey: ['products'],
    queryFn: async () => {
      const { data } = await axios.get('/products');
      return data.data;
    },
    initialData: [],
  });
}

export const useGetCartProducts = () => {
  return useQuery<IProduct[]>({
    queryKey: ['cart-products'],
    queryFn: async () => {
      const { data } = await axios.get('/products/cart');
      return data.data;
    },
    initialData: [],
  });
}

export const useAddToCart = () => {
  return useMutation({
    mutationFn: async (id_product: string) => {
      const response = await axios.post(`/products/cart`, { id_product });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['cart-products'],
      });
    },
  });
}

export const useBuyProducts = () => {
  return useMutation({
    mutationFn: async () => {
      const response = await axios.post(`/products/buy`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['cart-products'],
      });
    },
  });
}

export const useCreateProduct = () => {
  return useMutation({
    mutationFn: async (data: PCreateProduct) => {
      const response = await axios.post('/products', data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['products'],
      });
    }
  });
}

export const useDeleteProduct = () => {
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await axios.delete(`/products/${id}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['products'],
      });
    },
  });
}