import { InjectionToken } from '@angular/core';
import { Api } from '../core/models/api';

export const AUTH_API_URL = new InjectionToken<Api>('AUTH.api.url');
export const ACCOUNT_API_URL = new InjectionToken<Api>('AUTH.api.url');
