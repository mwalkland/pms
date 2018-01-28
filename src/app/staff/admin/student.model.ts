import { Staff } from './staff.model';

export class Student {
  constructor(
    public id: string,
    public email: string,
    public firstname: string,
    public surname: string,
    public projectname: string,
    public supervisor: Staff,
    public confirmed: string,
    public projectDesc: string,
    public supervisorName?: string
  ) { };
}