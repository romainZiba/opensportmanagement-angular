export class Place {
  _id: number;
  name: string;
  address: string;
  city: string;
  type: PlaceType;
}

export enum PlaceType {
  STADIUM,
  BAR,
  OTHER
}
