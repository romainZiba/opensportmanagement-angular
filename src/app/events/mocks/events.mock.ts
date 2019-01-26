import { EventDtos } from '../models/events-dto';

export const EVENTS_MOCK: { [pageNumber: number]: EventDtos } = {
  0: {
    _embedded: {
      eventDtoes: [
        {
          _id: 4,
          name: 'Event#1',
          fromDateTime: '2010-01-02T10:15:00',
          toDateTime: '2010-01-02T10:45:00',
          placeId: 3,
          placeName: 'Place #1',
          presentMembers: [],
          absentMembers: [],
          waitingMembers: [],
          openForRegistration: true,
          cancelled: true,
          teamId: 1,
          localTeamName: null,
          visitorTeamName: null,
          localTeamImgUrl: null,
          visitorTeamImgUrl: null,
          visitorTeamScore: null,
          localTeamScore: null,
          done: null
        },
        {
          _id: 9,
          name: 'Event#2',
          fromDateTime: '2010-01-03T10:15:00',
          toDateTime: '2010-01-03T10:45:00',
          placeId: 3,
          placeName: 'Place #1',
          presentMembers: [],
          absentMembers: [],
          waitingMembers: [],
          openForRegistration: true,
          cancelled: false,
          teamId: 1,
          localTeamName: null,
          visitorTeamName: null,
          localTeamImgUrl: null,
          visitorTeamImgUrl: null,
          visitorTeamScore: null,
          localTeamScore: null,
          done: null
        }
      ]
    },
    _links: {
      first: {
        href: 'https://localhost:8090/teams/1/events?page=0&size=2'
      },
      next: {
        href: 'https://localhost:8090/teams/1/events?page=1&size=2'
      },
      self: {
        href: 'https://localhost:8090/teams/1/events?page=1&size=2'
      },
      last: {
        href: 'https://localhost:8090/teams/1/events?page=1&size=2'
      }
    },
    page: {
      size: 2,
      totalElements: 4,
      totalPages: 2,
      number: 1
    }
  },
  1: {
    _embedded: {
      eventDtoes: [
        {
          _id: 10,
          name: 'Event#3',
          fromDateTime: '2010-01-02T10:15:00',
          toDateTime: '2010-01-02T10:45:00',
          placeId: 3,
          placeName: 'Place #1',
          presentMembers: [],
          absentMembers: [],
          waitingMembers: [],
          openForRegistration: true,
          cancelled: false,
          teamId: 1,
          localTeamName: null,
          visitorTeamName: null,
          localTeamImgUrl: null,
          visitorTeamImgUrl: null,
          visitorTeamScore: null,
          localTeamScore: null,
          done: null
        },
        {
          _id: 11,
          name: 'Event#4',
          fromDateTime: '2010-01-03T10:15:00',
          toDateTime: '2010-01-03T10:45:00',
          placeId: 3,
          placeName: 'Place #1',
          presentMembers: [],
          absentMembers: [],
          waitingMembers: [],
          openForRegistration: true,
          cancelled: false,
          teamId: 1,
          localTeamName: null,
          visitorTeamName: null,
          localTeamImgUrl: null,
          visitorTeamImgUrl: null,
          visitorTeamScore: null,
          localTeamScore: null,
          done: null
        }
      ]
    },
    _links: {
      first: {
        href: 'https://localhost:8090/teams/1/events?page=0&size=2'
      },
      prev: {
        href: 'https://localhost:8090/teams/1/events?page=0&size=2'
      },
      self: {
        href: 'https://localhost:8090/teams/1/events?page=1&size=2'
      },
      last: {
        href: 'https://localhost:8090/teams/1/events?page=1&size=2'
      }
    },
    page: {
      size: 2,
      totalElements: 4,
      totalPages: 2,
      number: 1
    }
  }
};
