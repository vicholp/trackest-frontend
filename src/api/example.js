import api from './index';

export default {
  getAll() {
    return api.get('/api/items');
  },
  getById(id) {
    return api.get(`/api/items/${id}`);
  },
};
