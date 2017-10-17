export class User {
  constructor(
    public email: String,
    public password: String,
    public firstname?: String,
    public surname?: String,
    public type?: String
  ) { }
}