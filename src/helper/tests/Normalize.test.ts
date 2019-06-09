import { maxLength } from '../Normalize';
describe('Normalize.ts', () => {
    it('maxLength', () => {
        expect(maxLength(1)('1')).toEqual('1');
        expect(maxLength(1)('12')).toEqual('1');
    });
});
