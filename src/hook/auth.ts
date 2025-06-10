import { useMutation, useQuery } from "@tanstack/react-query";
import axios from '@/lib/axios'
import type { PLogin, PRegister } from "@/interfaces/auth";
import type { IUser } from "@/interfaces/user";
import { queryClient } from "@/client";

export const useLogin = () => {
  return useMutation({
    mutationFn: async (data: PLogin) => {
      const response = await axios.post('/auth/login', data);
      return response.data.data;
    },
    onSuccess: (data) => {
      console.log('Login successful:', data);
      localStorage.setItem('token', data.token); // Store token in localStorage
      // You can handle successful login here, e.g., redirecting the user or storing tokens
    },
    onError: (error) => {
      console.error('Login failed:', error);
    }
  });
}

export const useRegister = () => {
  return useMutation({
    mutationFn: async (data: PRegister) => {
      const response = await axios.post('/auth/register', data);
      return response.data;
    },
    onSuccess: (data) => {
      console.log('Registration successful:', data);
      // Handle successful registration, e.g., redirecting to login page
    },
    onError: (error) => {
      console.error('Registration failed:', error);
    }
  });
}

export const useProfile = () => {
  return useQuery<IUser | null | undefined>({
    queryKey: ['profile'],
    queryFn: async () => {
      if (!localStorage.getItem('token')) {
        return null; // Return null if no token is found
      }
      const response = await axios.get('/auth/profile');
      return response.data.data;
    },
    initialData: null,
  });
}

export const useLogout = () => {
  return useMutation({
    mutationFn: async () => {
      localStorage.removeItem('token');
    },
    onSuccess: () => {
      console.log("ENTRO")
      queryClient.invalidateQueries({ queryKey: ["profile"] })
    },
    onError: (error) => {
      console.error('Logout failed:', error);
    }
  });
}