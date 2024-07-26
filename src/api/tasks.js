import api from './index';

export default {
  getById(id) {
    return api.get(`/api/tasks/${id}`);
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
