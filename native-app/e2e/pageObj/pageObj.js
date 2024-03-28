import { BaseObj } from './baseObj'

  export const MachineState = {
    calculateHealth: new BaseObj('calculate-health'),
    resetMachineData: new BaseObj('reset-machine-data'),
    machineHealthScore: new BaseObj('machine-health-score'),
    logPartTab: new BaseObj('log-part')
  }

  export const LogPart = {
    machineName: new BaseObj('machine-name'),
    partName: new BaseObj('part-name'),
    partValue: new BaseObj('part-value'),
    machineStaleTab: new BaseObj('machine-state'),
    saveBtn: new BaseObj('save-btn')
  }

  