import { useMutation, useQuery } from "@tanstack/react-query";
import axios from '@/lib/axios';
import { queryClient } from "@/client";
import type { PCreateSupplier, Supplier } from "@/interfaces/supplier";

export const useGetSuppliers = () => {
  return useQuery<Supplier[]>({
    queryKey: ["suppliers"],
    queryFn: async () => {
      const { data } = await axios.get("/suppliers");
      return data.data;
    },
    initialData: []
  });
}

export const useCreateSupplier = () => {
  return useMutation({
    mutationFn: async (supplierData: PCreateSupplier) => {
      const { data } = await axios.post("/suppliers", supplierData);
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["suppliers"],
      });
    }
  });
}

export const useDeleteSupplier = () => {
  return useMutation({
    mutationFn: async (supplierId: string) => {
      const { data } = await axios.delete(`/suppliers/${supplierId}`);
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["suppliers"],
      });
    }
  });
}