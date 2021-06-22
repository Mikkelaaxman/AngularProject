import { browser, by, element, logging } from 'protractor';
import { AppPage } from './app.po';


describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });
  
  // it('should display welcome message', async () => {
  //   await page.navigateTo();
  //   expect(await page.getTitleText()).toEqual('kvalifik app is running!');
  // });

    it('shoud display Event page', async () =>{
      await page.navigateTo();
      expect(await page.getEventPage().getText()).toEqual("Events");
    });

    it('should display route Event page', async () =>{
      await page.navigateTo();
      await page.getEventPage().click();

      expect(await page.getEventPageText()).toEqual("Upcoming Events");
    });

  

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
