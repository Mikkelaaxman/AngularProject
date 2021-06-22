import { browser, element, by } from "protractor";
import { AppPage } from "./app.po";

describe('Event section', () => {
    let helper: AppPage;

    beforeEach(async () => {
        helper = new AppPage();

        await browser.waitForAngularEnabled(false);
        await browser.get('/');  // reload your SPA
    });

    it('Navigate to the edit event page', async () => {

        await element(by.css(".e2e-event")).click();

        await element.all(by.css(".e2e-edit")).first().click();

        expect(await element(by.css("h3")).getText()).toEqual("Edit Event");
    });

    it('Navigate to the new event page', async () => {
        
        await element(by.css(".e2e-events")).click();

        await element(by.id('newEventBtn')).click();

        expect(await element(by.css("h3")).getText()).toEqual("Create New Event");
    });

     it('Create new event', async() => {
         await helper.navigateToEvents();
         await browser.sleep(500);
         const eventsBeforeAdding: number = await (await element.all(by.tagName('mat-row'))).length;

         await helper.clickNewEventButton();
         await browser.sleep(500);
         await element(by.id('eventInput')).sendKeys('Test Event');
         await element(by.id('locationInput')).sendKeys('This is the location of Test Event');
         await element(by.id("descriptionInput")).sendKeys("this is a Description of Test Event")
         await element(by.id("fromDate")).sendKeys("01-01-1970, 00:00:01")
         await element(by.id("toDate")).sendKeys("02-01-1970, 00:00:01")
         await element(by.id("statusInput")).sendKeys("Draft")

         await element(by.id('saveEvent')).click();

         const eventsAfterAdding: number = await (await element.all(by.tagName('mat-row'))).length;

         expect(eventsAfterAdding).toEqual(eventsBeforeAdding + 1);
    });

    it("Delete Test Event", async() =>{
        //Gå til events
        await helper.navigateToEvents();
        await browser.sleep(500);

        //check antal af events
        const eventsBeforeAdding: number = await (await element.all(by.tagName('mat-row'))).length;

        //Click Edit Event på test event
       //TODO HVORDAN? await element.all(by.binding("event.event"))
       // await element.all(by.tagName("mat-row"))).lastIndexOf

        //Click Delete event btn
        await element(by.id("deleteEventBtn")).click();
        await browser.sleep(500);

        //Check 1 mindre event i listen
        const eventsAfterAdding: number = await (await element.all(by.tagName('mat-row'))).length;

        expect(eventsAfterAdding).toEqual(eventsBeforeAdding - 1);
    })
});