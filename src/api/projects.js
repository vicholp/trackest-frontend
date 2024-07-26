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
  },
};
