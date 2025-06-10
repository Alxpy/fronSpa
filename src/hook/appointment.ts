import { useQuery, useMutation } from "@tanstack/react-query";
import axios from '@/lib/axios';
import { queryClient } from "@/client";
import type { IAppointment, PCreateAppointment } from "@/interfaces/appointment";

export const useGetAppointments = () => {
  return useQuery<IAppointment[]>({
    queryKey: ['appointments'],
    queryFn: async () => {
      const { data } = await axios.get('/appointments');
      return data.data;
    },
    initialData: [],
  });
}

export const useCreateAppointment = () => {
  return useMutation({
    mutationFn: async (appointment: PCreateAppointment) => {
      const { data } = await axios.post('/appointments', appointment);
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['appointments'] });
    },
  });
}