import { AppPage } from './app.po';

describe('poller App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display New Poll page', () => {
    page.navigateTo();
    expect(page.getCardTitle()).toEqual('Create Poll');
  });
});
