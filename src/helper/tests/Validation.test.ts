import { onlyNumber, required } from '../Validation';
describe('Validation.ts', () => {
    it('required', () => {
        expect(required('1')).toEqual(undefined);
        expect(required(undefined)).toEqual('Please fill');
    });

    it('onlyNumber', () => {
        expect(onlyNumber(undefined)).toEqual('Must be a number');
        expect(onlyNumber(0)).toEqual('Must be a number');
        expect(onlyNumber(1)).toEqual(undefined);
    });
});
