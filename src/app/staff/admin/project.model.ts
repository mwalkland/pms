export class Project {
  constructor(
    public name: string,
    public description: string,
    public areas: string[],
    public staffName: string,
    public staffEmail: string,
    public staffId: string,
    public studentName: string,
    public type: string,
    public confirmed: boolean
  ) { };
}