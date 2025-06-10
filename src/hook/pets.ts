import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "@/lib/axios";
import { queryClient } from "@/client";
import type { IPet, PCreatePet } from "@/interfaces/pet";

export const useGetPets = () => {
  return useQuery<IPet[]>({
    queryKey: ["pets"],
    queryFn: async () => {
      const { data } = await axios.get("/pets");
      return data.data;
    },
    initialData: [],
  });
};

export const useCreatePet = () => {
  return useMutation({
    mutationFn: async (petData: PCreatePet) => {
      const response = await axios.post("/pets", petData);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pets"] });
    },
  });
};

export const useDeletePet = () => {
  return useMutation({
    mutationFn: async (petId: string) => {
      const response = await axios.delete(`/pets/${petId}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pets"] });
    },
  });
}