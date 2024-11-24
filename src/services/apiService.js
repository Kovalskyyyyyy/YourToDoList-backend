import axios from 'axios';

const API_URL = 'http://localhost:3003/api'; 

const apiService = {
  // Lists
  getLists: () => axios.get(`${API_URL}/lists`),
  createList: (list) => axios.post(`${API_URL}/lists`, list),
  updateList: (id, list) => axios.put(`${API_URL}/lists/${id}`, list),
  deleteList: (id) => axios.delete(`${API_URL}/lists/${id}`),

  // Users
  getUser: (id) => axios.get(`${API_URL}/users/${id}`),
  createUser: (user) => axios.post(`${API_URL}/users`, user),
  updateUser: (id, user) => axios.put(`${API_URL}/users/${id}`, user),
  deleteUser: (id) => axios.delete(`${API_URL}/users/${id}`),

  // Items
  createItem: (item) => axios.post(`${API_URL}/items`, item),
  updateItem: (id, item) => axios.put(`${API_URL}/items/${id}`, item),
  deleteItem: (id) => axios.delete(`${API_URL}/items/${id}`),

  // Members
  createMember: (member) => axios.post(`${API_URL}/members`, member),
  updateMember: (id, member) => axios.put(`${API_URL}/members/${id}`, member),
  deleteMember: (id) => axios.delete(`${API_URL}/members/${id}`),
};

export default apiService;
