import { Configuration } from './configuration';

const host = 'localhost';
const port = '8090';

export const environment: Configuration = {
  production: false,
  host,
  port,
  apiUrl: `https://${host}:${port}`,
  authApi: {
    baseUrl: `https://${host}:${port}/accounts`,
    useMock: true
  },
  teamApi: {
    baseUrl: `https://${host}:${port}/teams`,
    useMock: true
  }
};
