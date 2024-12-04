import { describe, it, expect } from 'vitest';
import {Matrix} from '../classes/Matrix';
import { multiplyMatrices } from '../classUtils/matrixOperations';

describe('multiplyMatrices', () => {
    it('should multiply two matrices', () => {
        const matrix1 = new Matrix(2, 3);
        matrix1.setElement(0, 0, 1);
        matrix1.setElement(0, 1, 2);
        matrix1.setElement(0, 2, 3);
        matrix1.setElement(1, 0, 4);
        matrix1.setElement(1, 1, 5);
        matrix1.setElement(1, 2, 6);
        const matrix2 = new Matrix(3, 2);
        matrix2.setElement(0, 0, 7);
        matrix2.setElement(0, 1, 8);
        matrix2.setElement(1, 0, 9);
        matrix2.setElement(1, 1, 10);
        matrix2.setElement(2, 0, 11);
        matrix2.setElement(2, 1, 12);   

        const result = multiplyMatrices(matrix1, matrix2);
        expect(result.getData()).toEqual([
           [58, 64],
           [139, 154]
        ]);
    });

    it('should return null if the matrices cannot be multiplied', () => {
        const matrix1 = new Matrix(2, 3);
        const matrix2 = new Matrix(2, 2);
        expect(multiplyMatrices(matrix1, matrix2)).toBeNull();
    });
});