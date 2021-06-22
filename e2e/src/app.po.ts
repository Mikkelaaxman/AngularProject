import { browser, by, element } from 'protractor';

export class AppPage {
  async navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl);
  }

  async getTitleText(): Promise<string> {
    return element(by.css('app-root .content span')).getText();
  }

  async navigateToPosts() {
    await element(by.css(".e2e-posts")).click();
  }

  async clickNewPostButton() {
    await element(by.id('newPostBtn')).click();
  }
  
  async clickNewEventButton() {
    await element(by.id("newEventBtn")).click()
  }

  async navigateToEvents() {
    await element(by.id(".e2e-events")).click();
  }

  getEventPage(){
    return element(by.css('[routerLink="events"]'));
  }

  getEventPageText(){
    return element(by.css('app-events h3')).getText();
  }
}
