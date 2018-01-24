export class Student {
  constructor(
    public id: string,
    public email: string,
    public firstname: string,
    public surname: string,
    public projectname: string,
    public supervisor: string,
    public confirmed: string
  ) { };
}