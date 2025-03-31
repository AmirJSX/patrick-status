import { up } from 'up-fetch';

const api = up(fetch, () => ({
  baseUrl: 'https://demo.patrickstatus.com/PatrickStats/api/',
  timeout: 3000,
}));

export default api;
