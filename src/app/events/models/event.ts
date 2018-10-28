export interface Event {
  _id: number;
  name: string;
  fromDateTime: string;
  toDateTime: string;
  placeId: number;
  placeName: string;
  presentMembers: any[];
  absentMembers: any[];
  waitingMembers: any[];
  openForRegistration: boolean;
  cancelled: boolean;
  teamId: number;
  localTeamName?: any;
  visitorTeamName?: any;
  localTeamImgUrl?: any;
  visitorTeamImgUrl?: any;
  visitorTeamScore?: any;
  localTeamScore?: any;
  done?: any;
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
  recurrenceDays?: string[];
  opponentId?: number;
  championshipId?: number;
  type: EventType;
}

export enum EventType {
  TRAINING = "TRAINING",
  MATCH = "MATCH",
  OTHER = "OTHER"
}
