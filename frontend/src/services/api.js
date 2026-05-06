import axios from 'axios';

const API_URL = '/api';

export const api = {
  products: {
    getAll: async (params = {}) => {
      const response = await axios.get(`${API_URL}/products`, { params });
      return response.data;
    },
    getById: async (id) => {
      const response = await axios.get(`${API_URL}/products/${id}`);
      return response.data;
    }
  }
};
