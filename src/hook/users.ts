import { useQuery, useMutation } from "@tanstack/react-query";
import axios from '@/lib/axios';
import type { IUser } from "@/interfaces/user";
import { queryClient } from "@/client";

export const useGetUsers = () => {
  return useQuery<IUser[]>({
    queryKey: ['users'],
    queryFn: async () => {
      const { data } = await axios.get('/users');
      return data.data;
    },
    initialData: [],
  });
}

export const useDeleteUser = () => {
  return useMutation({
    mutationFn: async (id: string) => {
      const { data } = await axios.delete(`/users/${id}`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
}