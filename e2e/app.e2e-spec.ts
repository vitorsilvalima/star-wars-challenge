import { StarWarsChallengePage } from './app.po';

describe('star-wars-challenge App', () => {
  let page: StarWarsChallengePage;

  beforeEach(() => {
    page = new StarWarsChallengePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
