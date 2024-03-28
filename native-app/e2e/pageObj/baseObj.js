export class BaseObj {

    static defaultTimeout = 15000

    constructor(id) {
        this.element = element(by.id(id))
    }

    async tap() {
       await this.element.tap()
    }

    async isEnabled() {
      return (await this.element.getAttributes()).enabled
    }
    
    async clear() {
      await this.element.clearText()
    }

    async type(text) {
        await this.clear()
        await this.element.typeText(text)
    }

    async tapReturn() {
        await this.element.tapReturnKey()
      }

    async waitForVisible(timeout = BaseObj.defaultTimeout) {
      return await waitFor(this.element)
        .toBeVisible()
        .withTimeout(timeout)
    }
    async tapDone() {
      await element(by.text('Done')).atIndex(0).tap()
    }
    async selectDropList(id, name) {
      const pickerEl = await element(by.type('UIPickerView'));
      await pickerEl.setColumnToValue(id, name);
      await this.tapDone()
    }    

    expect() {
      return expect(this.element)
    }

    async expectToBeVisible() {
      try {
       await this.expect().toBeVisible()
       return true
      } catch(e) {
        return false;
      }
    }

    async swipeUp() {
        await this.element.swipe('up', 'slow')
      }

    async getText() {
        return (await this.element.getAttributes('text')).text
    }
  }
