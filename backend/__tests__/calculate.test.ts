import {calculatePartHealth, calculateMachineHealth, linearScale} from '../calculations';
import {
  MachineType,
  WeldingRobotPart,
  partInfo,
} from '../../native-app/data/types';

describe('calculatePartHealth', () => {
  it('calculates part health correctly', () => {
    const machineName: MachineType = MachineType.WeldingRobot;
    const part: partInfo = {name: WeldingRobotPart.ErrorRate, value: 0.5};
    const expectedHealth = 72.22222222222223;

    const result = calculatePartHealth(machineName, part);
    expect(result).toBe(expectedHealth);
  });
});

describe('calculateMachineHealth', () => {
  it('calculates machine health correctly', () => {
    const machineName: MachineType = MachineType.WeldingRobot;
    const parts = [
      {name: WeldingRobotPart.ErrorRate, value: 0.5},
      {name: WeldingRobotPart.VibrationLevel, value: 4.0},
      {name: WeldingRobotPart.ElectrodeWear, value: 0.8},
      {name: WeldingRobotPart.ShieldingPressure, value: 12.0},
      {name: WeldingRobotPart.WireFeedRate, value: 7.5},
      {name: WeldingRobotPart.ArcStability, value: 92.0},
      {name: WeldingRobotPart.SeamWidth, value: 1.5},
      {name: WeldingRobotPart.CoolingEfficiency, value: 85.0},
    ];
    const expectedHealth = 76.70138888888889;

    const result = calculateMachineHealth(machineName, parts);
    expect(result).toBe(expectedHealth);
  });
});

describe('linearScale', () => {
  it('scales value correctly within range', () => {
    expect(linearScale(5, 0, 10, 0, 10)).toBe(5);
  });

  it('clamps value to minimum input', () => {
    expect(linearScale(-1, 0, 10, 0, 10)).toBe(0);
  });

  it('clamps value to maximum input', () => {
    expect(linearScale(11, 0, 10, 0, 10)).toBe(10);
  });
});

describe('calculatePartHealth', () => {
  it('returns 0 for an unknown machine', () => {
    const result = calculatePartHealth('UnknownMachine' as any, { name: WeldingRobotPart.VibrationLevel, value: 1 });
    expect(result).toBe(0);
  });

  it('returns -1 for an unknown part', () => {
    const result = calculatePartHealth('UnknownMachine' as any, { name: WeldingRobotPart.VibrationLevel, value: 1 });
    expect(result).toBe(0);
  });

  it('returns 100 for a value in the optimal range', () => {
    expect(calculatePartHealth('WeldingRobot' as any, { name: WeldingRobotPart.VibrationLevel, value: 0.5 })).toBe(100);
  });

  it('returns 50 for a value at the low end of the normal range', () => {
    expect(calculatePartHealth('WeldingRobot' as any, { name: WeldingRobotPart.VibrationLevel, value: 1 })).toBe(50);
  });

  it('returns 0 for a value outside any range', () => {
    expect(calculatePartHealth('WeldingRobot' as any, { name: WeldingRobotPart.VibrationLevel, value: 11 })).toBe(0);
  });

  it('ignores unknown parts in average score calculation', () => {
    const parts = [
      { name: MachineType.WeldingRobot, value: 1 },
      { name: 'unknownPart' as any, value: 1 }
    ];
    expect(calculateMachineHealth(MachineType.WeldingRobot, parts)).toBe(50);
  });
});
