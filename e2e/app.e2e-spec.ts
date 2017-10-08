import { PmsPage } from './app.po';

describe('pms App', () => {
  let page: PmsPage;

  beforeEach(() => {
    page = new PmsPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
