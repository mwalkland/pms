import { StaffMatcher } from './staff-matcher';
import { User } from '../../auth/user.model';

describe('StaffMatcher', () => {
  let matcher: StaffMatcher;

  describe('.getStaffScore(staff)', () => {

    it('returns 0 when there are no staff areas', () => {
      matcher = new StaffMatcher(['area1', 'area2', 'area3'], null);
      const user = new User('email', 'password', 'firstname', 'surname', 'type', false, {
        first: '',
        second: '',
        third: '',
        fourth: '',
        fifth: ''
      });
      const score = matcher.getStaffScore(user);
      expect(score).toEqual(0);
    });

    it('returns 0 when there are no project areas', () => {
      matcher = new StaffMatcher([], null);
      const user = new User('email', 'password', 'firstname', 'surname', 'type', false, {
        first: 'area1',
        second: 'area2',
        third: 'area3',
        fourth: 'area4',
        fifth: 'area5'
      });
      const score = matcher.getStaffScore(user);
      expect(score).toEqual(0);
    });

    it('returns correct score for staff member', () => {
      matcher = new StaffMatcher(['area1', 'area2', 'area3'], null);
      const user = new User('email', 'password', 'firstname', 'surname', 'type', false, {
        first: 'area2',
        second: 'area4',
        third: 'area5',
        fourth: 'area1',
        fifth: 'area3'
      });
      const score = matcher.getStaffScore(user);
      expect(score).toEqual(9);
    });

  });

  describe('sortScores()', () => {

    it('correctly orders the scores from highest to lowest', () => {
      matcher = new StaffMatcher(null, null);
      const unsorted = [
        { email: '', score: 7 },
        { email: '', score: 10 },
        { email: '', score: 4 },
        { email: '', score: 1 },
        { email: '', score: 12 },
        { email: '', score: 9 }
      ];
      const sorted = [
        { email: '', score: 12 },
        { email: '', score: 10 },
        { email: '', score: 9 },
        { email: '', score: 7 },
        { email: '', score: 4 },
        { email: '', score: 1 }
      ]
      expect(matcher.sortScores(unsorted)).toEqual(sorted);
    });

  });

  describe('getMostRelevantStaff()', () => {

    beforeEach(() => {
      matcher = new StaffMatcher(null, null);
    });

    it('returns array of length 3 if the top 3 scores are different', () => {
      const sorted = [
        { email: '', score: 3 },
        { email: '', score: 2 },
        { email: '', score: 1 }
      ];
      expect(matcher.getMostRelevantStaff(sorted).length).toEqual(3);
    });

    it('returns array of length 4 if the top 4 scores are all the same', () => {
      const sorted = [
        { email: '', score: 1 },
        { email: '', score: 1 },
        { email: '', score: 1 },
        { email: '', score: 1 }
      ];
      expect(matcher.getMostRelevantStaff(sorted).length).toEqual(4);
    });

    it('returns array of length 3 if the top 2 scores are the same and the 3rd is different', () => {
      const sorted = [
        { email: '', score: 2 },
        { email: '', score: 2 },
        { email: '', score: 1 }
      ];
      expect(matcher.getMostRelevantStaff(sorted).length).toEqual(3);
    });

    it('returns array of length 3 if the top 3 scores are the same and the 4th is different', () => {
      const sorted = [
        { email: '', score: 2 },
        { email: '', score: 2 },
        { email: '', score: 2 },
        { email: '', score: 1 }
      ];
      expect(matcher.getMostRelevantStaff(sorted).length).toEqual(3);
    });

    it('returns array of length 0 if all scores are 0', () => {
      const sorted = [
        { email: '', score: 0 },
        { email: '', score: 0 },
        { email: '', score: 0 },
        { email: '', score: 0 }
      ];
      expect(matcher.getMostRelevantStaff(sorted).length).toEqual(0);
    });

    it('returns array of length 1 if only 1 score is not 0', () => {
      const sorted = [
        { email: '', score: 3 },
        { email: '', score: 0 },
        { email: '', score: 0 },
        { email: '', score: 0 }
      ];
      expect(matcher.getMostRelevantStaff(sorted).length).toEqual(1);
    });

    it('returns the top 3 different scores', () => {
      const sorted = [
        { email: '', score: 10 },
        { email: '', score: 8 },
        { email: '', score: 7 },
        { email: '', score: 6 },
        { email: '', score: 3 },
        { email: '', score: 1 },
        { email: '', score: 2 }
      ];
      expect(matcher.getMostRelevantStaff(sorted)).toEqual([
        { email: '', score: 10 },
        { email: '', score: 8 },
        { email: '', score: 7 },
      ]);
    });
    it('returns the top 4 scores if the last two are the same', () => {
      const sorted = [
        { email: '', score: 10 },
        { email: '', score: 8 },
        { email: '', score: 7 },
        { email: '', score: 7 },
        { email: '', score: 2 },
        { email: '', score: 1 },
        { email: '', score: 2 }
      ];
      expect(matcher.getMostRelevantStaff(sorted)).toEqual([
        { email: '', score: 10 },
        { email: '', score: 8 },
        { email: '', score: 7 },
        { email: '', score: 7 },
      ]);
    });
  });

  describe('findStaff()', () => {

    it('returns the correct top 3 staff', () => {
      matcher = new StaffMatcher(['area1', 'area2', 'area3'], [
        new User('email1', 'password', 'firstname', 'surname', 'type', false, {
          first: 'area2',
          second: 'area4',
          third: 'area5',
          fourth: 'area1',
          fifth: 'area3'
        }),
        new User('email2', 'password', 'firstname', 'surname', 'type', false, {
          first: 'area3',
          second: 'area1',
          third: 'area2',
          fourth: 'area5',
          fifth: 'area4'
        }),
        new User('email3', 'password', 'firstname', 'surname', 'type', false, {
          first: 'area1',
          second: 'area2',
          third: 'area6',
          fourth: 'area5',
          fifth: 'area4'
        }),
        new User('email4', 'password', 'firstname', 'surname', 'type', false, {
          first: 'area5',
          second: 'area4',
          third: 'area2',
          fourth: 'area3',
          fifth: 'area1'
        })
      ]);

      const expected = [
        { email: 'email2', score: 13 },
        { email: 'email3', score: 10 },
        { email: 'email1', score: 9 }
      ];

      expect(matcher.findStaff()).toEqual(expected);
    });

  });

});