import api from './index';

export default {
  mine() {
    return api.get('/api/works/mine');
  },
};
