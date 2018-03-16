import {WorkingHoursPage} from './app.po';

describe('working-hours App', () => {
  let page: WorkingHoursPage;

  beforeEach(() => {
    page = new WorkingHoursPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
