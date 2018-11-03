import { Event } from './event';

export interface Embedded {
  eventDtoes: Event[];
}

export interface First {
  href: string;
}

export interface Self {
  href: string;
}

export interface Next {
  href: string;
}

export interface Last {
  href: string;
}

export interface Links {
  first: First;
  self: Self;
  next: Next;
  last: Last;
}

export interface Page {
  size: number;
  totalElements: number;
  totalPages: number;
  number: number;
}

export interface EventDtos {
  _embedded: Embedded;
  _links: Links;
  page: Page;
}
