import api from './index';

export default {
  getById(id) {
    return api.get(`/api/tasks/${id}`);
  },
  getAll(params) {
    return api.get('/api/tasks', {params});
  },
  works: {
    create(taskId, data) {
      return api.post(`/api/tasks/${taskId}/works`, data);
    },
    getAll(taskId) {
      return api.get(`/api/tasks/${taskId}/works`);
    },
  },
};
