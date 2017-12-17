import { User } from '../auth/user.model';
export class Project {
  constructor(
    public name: string,
    public description: string,
    public maxStudents?: number,
    public areas?: [string],
    public staff?: User,
    public areaString?: string
  ) { }
}