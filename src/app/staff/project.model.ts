export class Project {
  constructor(
    public name: string,
    public description: string,
    public maxStudents?: Number,
    public areas?: [string],
  ) { }
}