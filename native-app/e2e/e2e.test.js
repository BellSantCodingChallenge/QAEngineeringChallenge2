import {
    MachineState,
    LogPart
  } from './pageObj/pageObj.js'
  const { expect: jestExpect } = require('expect');

describe('e2e', () => {
    beforeAll(async () => {
        await device.launchApp();
    });

    beforeEach(async () => {
        await device.reloadReactNative();
    });

      it('calculates score with valid input values', async () => {
        await MachineState.logPartTab.tap()
        await LogPart.machineName.tap()
        await LogPart.machineName.selectDropList(0, 'Welding Robot');
        await LogPart.partName.tap()
        await LogPart.partName.selectDropList(0, 'Error Rate');
        await LogPart.partValue.type('0.1')
        await LogPart.saveBtn.tap();
        await waitFor(element(by.text('Saved ✔️'))).toBeVisible().withTimeout(2000);
        await LogPart.machineStaleTab.tap();
        await MachineState.calculateHealth.tap();
        const machineHealth = await MachineState.machineHealthScore.getText()
        const machineHealthInt = (parseInt(machineHealth.match(/\d+/)[0]));
        jestExpect(machineHealthInt).toEqual(50)
      });

      it('calculates machine health correctly', async () => {
        await MachineState.logPartTab.tap()
        await LogPart.machineName.tap();
        await LogPart.machineName.selectDropList(0, 'Welding Robot');
        
        const parts = [
          { name: 'Error Rate', value: '0.5' },
          { name: 'Vibration Level', value: '4.0' },
          { name: 'Electrode Wear', value: '0.8' },
          { name: 'Shielding Pressure', value: '12.0' },
          { name: 'Wire Feed Rate', value: '7.5' },
          { name: 'Arc Stability', value: '92.0' },
          { name: 'Seam Width', value: '1.5' },
          { name: 'Cooling Efficiency', value: '85.0' },
        ];
      
        for (const part of parts) {
          await LogPart.partName.tap();
          await LogPart.partName.selectDropList(0, part.name);
          await LogPart.partValue.type(part.value); 
          await LogPart.saveBtn.tap();
          await waitFor(element(by.text('Saved ✔️'))).toBeVisible().withTimeout(2000);
        }

        await LogPart.machineStaleTab.tap();
        await MachineState.calculateHealth.tap();
        await MachineState.machineHealthScore.waitForVisible()
        const expectedHealth = 76.70138888888889;
        const machineHealth = await MachineState.machineHealthScore.getText()
        const machineHealthFloat = (parseFloat(machineHealth.match(/\d+\.\d+/)[0]));
        jestExpect(expectedHealth).toBeCloseTo(machineHealthFloat, 2);
      });

      it('handles value below minimum range', async () => {
        await MachineState.logPartTab.tap();
        await LogPart.machineName.tap();
        await LogPart.machineName.selectDropList(0, 'Welding Robot');
        await LogPart.partName.tap();
        await LogPart.partName.selectDropList(0, 'Error Rate');
        await LogPart.partValue.type('-1'); // Entering a value below the minimum range
        await LogPart.saveBtn.tap();
        await waitFor(element(by.text('Saved ✔️'))).toBeVisible().withTimeout(2000);
        await LogPart.machineStaleTab.tap();
        const expectedHealth = 0;
        await MachineState.calculateHealth.tap();
        const result = await MachineState.machineHealthScore.getText();
        const parsedResult = (parseInt(result.match(/\d+/)[0]));
        jestExpect(parsedResult).toBe(expectedHealth);
      });
      
});
