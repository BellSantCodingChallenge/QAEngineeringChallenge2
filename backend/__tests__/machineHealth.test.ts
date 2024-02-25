import { getMachineHealth } from '../machineHealth';
import { Request } from 'express';

const mockRequest = (body: any): Request => {
    return { body } as Request;
};

describe('getMachineHealth', () => {
    it('returns an error for invalid input format', () => {
        const req = mockRequest({});
        const result = getMachineHealth(req);
        expect(result.error).toBe('Invalid input format');
    });

    it('calculates health for each machine', () => {
        const req = mockRequest({
            machines: {
                weldingRobot: {
                    vibrationLevel: '4.0',
                    electrodeWear: '0.8',
                }
            }
        });
        const result = getMachineHealth(req);
        expect(result.factory).toBeDefined();
        expect(result.machineScores?.weldingRobot).toBeDefined();
    });
});
