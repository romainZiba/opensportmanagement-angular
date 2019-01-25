import { InjectionToken } from '@angular/core';
import { Api } from '../core/models/api';

export const AUTH_API = new InjectionToken<Api>('AUTH.api');
