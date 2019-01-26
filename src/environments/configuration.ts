import { Api } from './../app/core/models/api';
export interface Configuration {
  production: boolean;
  host: string;
  port: string;
  apiUrl: string;
  authApi: Api;
  accountApi: Api;
  teamApi: Api;
  eventApi: Api;
}
