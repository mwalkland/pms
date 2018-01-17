import { User } from '../../auth/user.model';

export class StaffMatcher {

  constructor(private projectAreas: string[], private staffList: User[]) {

  }

  public findStaff() {
    const scores = [], finalArray: { email: string, score: number }[] = [];

    for (const staff of this.staffList) {
      const score = this.getStaffScore(staff),
        object = { email: staff.email, score: score };
      scores.push(object)
    }

    const sorted: { email: string, score: number }[] = scores.sort((a, b) => {
      return b.score - a.score;
    });

    return this.getMostRelevantStaff(sorted);
  }

  getStaffScore(staff: User): number {
    let score = 0;
    const staffAreas = staff.areas;
    for (const studentArea of this.projectAreas) {
      if (studentArea === staffAreas.first) {
        score += 6;
      } else if (studentArea === staffAreas.second) {
        score += 4;
      } else if (studentArea === staffAreas.third) {
        score += 3;
      } else if (studentArea === staffAreas.fourth) {
        score += 2;
      } else if (studentArea === staffAreas.fifth) {
        score += 1;
      }
    }
    return score;
  }

  getMostRelevantStaff(sorted: { email: string, score: number }[]): { email: string, score: number }[] {
    const resultArray: { email: string, score: number }[] = [];
    if (sorted[0].score !== 0) {
      resultArray.push(sorted[0]);
    }

    let count = 0;
    for (let i = 1; i < sorted.length - 1; i++) {

      if (count === 3) {
        break;
      }

      const element = sorted[i];
      const previous = sorted[i - 1];

      if (element.score === 0) {
        break;
      }

      if (element.score !== previous.score) {
        count++;
      }

      resultArray.push(element);
    }
    return resultArray;
  }

}
