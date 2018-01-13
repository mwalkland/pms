import { User } from '../auth/user.model';
export class Project {
  constructor(
    public id: string,
    public name: string,
    public description: string,
    public type: string,
    public maxStudents?: number,
    public areas?: [string],
    public staff?: User,
    public areaString?: string,
    public staffName?: string,
    public students?: [User]
  ) { }
}