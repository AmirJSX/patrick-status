import { up } from 'up-fetch';

const api = up(fetch, () => ({
  baseUrl: 'PatrickStats/api/',
  timeout: 3000,
}));

export default api;
