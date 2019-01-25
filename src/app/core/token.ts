import { Api } from './models/api';
import { InjectionToken } from '@angular/core';

export const TEAMS_API = new InjectionToken<Api>('TEAMS.api');
