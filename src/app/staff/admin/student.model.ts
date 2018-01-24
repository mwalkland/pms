import { Project } from '../../core/project.model';

export class Student {
  constructor(
    public id: string,
    public email: string,
    public firstname: string,
    public surname: string,
    public chosenProject: Project,
    confirmed: boolean
  ) { };
}