import { Project } from './project.model';

export class Staff {
  constructor(
    public _id: string,
    public email: string,
    public firstname: string,
    public surname: string,
    public projects: Project[],
    public noOfStudents: number
  ) { };
}