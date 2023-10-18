import { contain7, counting7s } from "./counting7s";

describe('counting7s', () => {
    it('should return error when n is not an integer', () => {
        expect(() => counting7s(1.5)).toThrowError('n must be an integer');
    });

    it('should return error when n is less than 0', () => {
        expect(() => counting7s(-1)).toThrowError('n must be greater than 0');
    });

    it('should return 0 for 0', () => {
        expect(counting7s(0)).toBe(0);
    });

    it('should return 2 for 20', () => {
        expect(counting7s(20)).toBe(2);
    });

    it('should return 8 for 70', () => {
        expect(counting7s(70)).toBe(8);
    });

    it('should return 19 for 100', () => {
        expect(counting7s(100)).toBe(19);
    });

    // it('should return 56953279 for 100000000', () => {
    //     expect(counting7s(100000000)).toBe(56953279);
    // });
});

describe('contain7', () => {
    it('should return true if the number contains 7', () => {
        expect(contain7(7)).toBe(true);
        expect(contain7(17)).toBe(true);
        expect(contain7(70)).toBe(true);
        expect(contain7(10279)).toBe(true);
    });

    it('should return false if the number does not contains 7', () => {
        expect(contain7(6)).toBe(false);
        expect(contain7(30)).toBe(false);
        expect(contain7(50)).toBe(false);
    });
});
