import { Api } from './../core/models/api';
import { InjectionToken } from '@angular/core';

export const EVENTS_API = new InjectionToken<Api>('EVENTS.api');
