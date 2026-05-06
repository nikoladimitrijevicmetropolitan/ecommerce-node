import axios from 'axios';
import type { Product, PaginatedResponse } from '../types';

const API_URL = '/api';

export interface ProductQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
}

export const api = {
  products: {
    getAll: async (params: ProductQueryParams = {}): Promise<PaginatedResponse<Product>> => {
      // Simulate slight network delay to show loading state nicely
      await new Promise(resolve => setTimeout(resolve, 300));
      const response = await axios.get(`${API_URL}/products`, { params });
      return response.data;
    },
    getById: async (id: string): Promise<Product> => {
      await new Promise(resolve => setTimeout(resolve, 200));
      const response = await axios.get(`${API_URL}/products/${id}`);
      return response.data;
    }
  }
};
