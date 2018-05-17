export class Opponent {
  constructor(id, n, pn, em, img) {
    this._id = id;
    this.name = n;
    this.phoneNumber = pn;
    this.email = em;
    this.imgUrl = img;
  }
  _id: number;
  name: string;
  phoneNumber: string;
  email: string;
  imgUrl: string;
}
