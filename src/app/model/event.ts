import {TeamMember} from './team-member';

export class Event {
  _id: number;
  name: string;
  description: string;
  fromDate: string;
  toDate: string;
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
