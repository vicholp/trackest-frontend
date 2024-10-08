import api from './index';
import tasks from './tasks';

export default {
  getAll() {
    return api.get('/api/projects');
  },
  tasks: {
    getAll(projectId) {
      return api.get(`/api/projects/${projectId}/tasks`);
    },
    create(projectId, task) {
      return api.post(`/api/projects/${projectId}/tasks`, task);
    },
  },
};
