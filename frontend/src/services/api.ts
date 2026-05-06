import axios from 'axios';
import { Product } from '../types';

const API_URL = '/api';

export const api = {
  products: {
    getAll: async (): Promise<Product[]> => {
      // Simulate slight network delay to show loading state nicely
      await new Promise(resolve => setTimeout(resolve, 600));
      const response = await axios.get(`${API_URL}/products`);
      return response.data;
    },
    getById: async (id: string): Promise<Product> => {
      await new Promise(resolve => setTimeout(resolve, 400));
      const response = await axios.get(`${API_URL}/products/${id}`);
      return response.data;
    }
  }
};
