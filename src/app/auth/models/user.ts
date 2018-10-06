export interface Credentials {
  username: string;
  password: string;
}

export class User {
  constructor(
    public username: string,
    public firstName: string,
    public lastName: string,
    public email: string,
    public phoneNumber: string
  ) {}
}
