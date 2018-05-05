import {TeamMember} from './TeamMember';

export class Event {
  _id: number;
  name: string;
  description: string;
  fromDate: string;
  toDate: string;
  place: string;
  done: boolean;
  localTeamName: string;
  localTeamImgUrl: string;
  localTeamScore: number;
  visitorTeamName: string;
  visitorTeamImgUrl: string;
  visitorTeamScore: number;
  presentMembers: TeamMember[];
  absentMembers: TeamMember[];
}
