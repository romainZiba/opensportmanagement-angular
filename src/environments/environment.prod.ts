import { Configuration } from './configuration';

const host = 'ns3268474.ip-5-39-81.eu';
const port = '8090';

export const environment: Configuration = {
  production: true,
  host,
  port,
  apiUrl: `https://${host}:${port}`,
  authApi: {
    baseUrl: `https://${host}:${port}/login`,
    useMock: false
  },
  accountApi: {
    baseUrl: `https://${host}:${port}/accounts`,
    useMock: false
  },
  teamApi: {
    baseUrl: `https://${host}:${port}/teams`,
    useMock: false
  },
  eventApi: {
    baseUrl: `https://${host}:${port}/events`,
    useMock: false
  }
};
