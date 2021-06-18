import { browser, element, by } from "protractor";
import { AppPage } from "./app.po";

describe('Posts section', () => {
    let helper: AppPage;

    beforeEach(async() => {
        helper = new AppPage();

        await browser.waitForAngularEnabled(false);
        await browser.get('/');  // reload your SPA
    });

    it('Navigate to the edit post page', async() => {
        // code here to test...
        
        await element(by.css(".e2e-posts")).click();
        
        await element.all(by.css(".e2e-edit")).first().click();
        
        expect(await element(by.css("h3")).getText()).toEqual("Edit Post");
    });

    it('Navigate to the new post page', async() => {
        // code here to test...
        await element(by.css(".e2e-posts")).click();
        
        await element(by.id('newPostBtn')).click();
        
        expect(await element(by.css("h3")).getText()).toEqual("Create New Post");
    });

    // it('Create new post', async() => {
    //     await helper.navigateToPosts();
    //     // await browser.sleep(500);
    //     const postsBeforeAdding: number = await (await element.all(by.tagName('mat-card'))).length;
    //     // expect(postsBeforeAdding.length).toEqual(0);

    //     await helper.clickNewPostButton();
    //     // await browser.sleep(500);
    //     await element(by.id('titleInput')).sendKeys('Test Post');
    //     await element(by.id('textInput')).sendKeys('This is the text of the Test Post');
    //     await element(by.id('savePost')).click();

    //     const postsAfterAdding: number = await (await element.all(by.tagName('mat-card'))).length;

    //     expect(postsAfterAdding).toEqual(postsBeforeAdding + 1); // try to make more robust test-code
        // instead of hardcoding numbers, like 5 and 6.
        // expect(postsBeforeAdding.length).toEqual(1);

    //});
});