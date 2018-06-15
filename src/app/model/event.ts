import {TeamMember} from './team-member';

export class Event {
  _id: number;
  name: string;
  description: string;
  fromDateTime: string;
  toDateTime: string;
  placeId: number;
  done: boolean;
  localTeamName: string;
  localTeamImgUrl: string;
  localTeamScore: number;
  visitorTeamName: string;
  visitorTeamImgUrl: string;
  visitorTeamScore: number;
  presentMembers: TeamMember[];
  absentMembers: TeamMember[];
  waitingMembers: TeamMember[];
}

export class EventCreation {
  teamId: number;
  name: string;
  fromDate: string;
  toDate: string;
  fromTime: string;
  toTime: string;
  placeId: number;
  isRecurrent: boolean;
  recurrenceDays: string[];
  opponentId: number;
  championshipId: number;
}

export enum EventType {
  TRAINING,
  MATCH,
  OTHER
}
