import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getSubmitButtonText() {
    return element(by.css('button')).getText();
  }
}
