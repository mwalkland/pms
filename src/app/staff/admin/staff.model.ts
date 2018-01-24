import { Project } from '../../core/project.model';

export class Staff {
  constructor(
    public id: string,
    public email: string,
    public firstname: string,
    public surname: string,
    public projects: Project[],
    public noOfStudents: number
  ) { };
}