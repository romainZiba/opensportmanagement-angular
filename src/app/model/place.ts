export class Place {
  constructor(id, n, add, t) {
    this._id = id;
    this.name = n;
    this.address = add;
    this.type = t;
  }
  _id: number;
  name: string;
  address: string;
  type: string;
}
