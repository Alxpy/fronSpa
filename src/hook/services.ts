import { useQuery, useMutation } from "@tanstack/react-query";
import axios from '@/lib/axios';
import type { IService, PCreateService } from "@/interfaces/services";
import { queryClient } from "@/client";

export const useGetServices = () => {
  return useQuery<IService[]>({
    queryKey: ['services'],
    queryFn: async () => {
      const { data } = await axios.get('/services');
      return data.data;
    },
    initialData: [],
  });
}

export const useCreateService = () => {
  return useMutation({
    mutationFn: async (data: PCreateService) => {
      const response = await axios.post('/services', data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['services']
      })
    }
  });
}

export const useDeleteService = () => {
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await axios.delete(`/services/${id}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['services']
      })
    }
  });
}