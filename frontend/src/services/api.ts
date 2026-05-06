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
      const response = await axios.get(`${API_URL}/products`, { params });
      return response.data;
    },
    getById: async (id: string): Promise<Product> => {
      const response = await axios.get(`${API_URL}/products/${id}`);
      return response.data;
    }
  }
};
