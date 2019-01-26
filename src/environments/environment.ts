import { Configuration } from './configuration';

const host = 'localhost';
const port = '8090';

export const environment: Configuration = {
  production: false,
  host,
  port,
  apiUrl: '',
  authApi: {
    baseUrl: '',
    useMock: true
  },
  accountApi: {
    baseUrl: '',
    useMock: true
  },
  teamApi: {
    baseUrl: '',
    useMock: true
  },
  eventApi: {
    baseUrl: '',
    useMock: true
  }
};
