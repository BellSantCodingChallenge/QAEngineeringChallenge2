describe('Home screen', () => {
    beforeAll(async () => {
        await device.launchApp();
    });

    beforeEach(async () => {
        await device.reloadReactNative();
    });

    it('Tap "Click me"', async () => {
        await element(by.id('click-reset')).tap();
        await expect(element(by.id('click-reset'))).toBeVisible();
    });
});