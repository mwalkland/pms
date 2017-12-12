export class Project {
  constructor(
    public name: String,
    public description: String,
    public maxStudents?: Number,
    public areas?: [String],
  ) { }
}