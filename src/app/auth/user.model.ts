export class User {
  constructor(
    public email: string,
    public password: string,
    public firstname?: string,
    public surname?: string,
    public type?: string,
    public projectChosen?: boolean
  ) { }
}