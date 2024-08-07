import api from './index';

export default {
  mine() {
    return api.get('/api/works/mine');
  },
  delete(id) {
    return api.delete(`/api/works/${id}`);
  },
  update(id, data) {
    return api.put(`/api/works/${id}`, data);
  },
};
