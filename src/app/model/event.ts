import {TeamMember} from './team-member';

export class Event {
  _id: number;
  name: string;
  description: string;
  fromDateTime: string;
  toDateTime: string;
  placeId: number;
  placeName: string;
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
  cancelled: boolean;
  openForRegistration: boolean;
}

export class EventCreateUpdate {
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
  type: EventType;
}

export enum EventType {
  TRAINING = "TRAINING",
  MATCH = "MATCH",
  OTHER = "OTHER"
}
