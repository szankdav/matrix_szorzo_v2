import { describe, it, expect } from 'vitest';
import { Matrix } from '../classes/Matrix';

describe('Matrix', () => {
  describe('constructor', () => {
    it('should create a matrix with given dimensions', () => {
      const matrix = new Matrix(2, 3);
      expect(matrix.row).toBe(2);
      expect(matrix.column).toBe(3);
      expect(matrix.getData()).toEqual([
        [0, 0, 0],
        [0, 0, 0]
      ]);
    });

    it('should throw error for non-positive dimensions', () => {
      expect(() => new Matrix(0, 3)).toThrow('A mátrix dimenziói nem lehetnek negatívak vagy nulla.');
      expect(() => new Matrix(2, -1)).toThrow('A mátrix dimenziói nem lehetnek negatívak vagy nulla.');
    });

    it('should throw error for non-numeric dimensions', () => {
      expect(() => new Matrix('2', 3)).toThrow('A mátrix dimenziói csak számok lehetnek.');
      expect(() => new Matrix(2, '3')).toThrow('A mátrix dimenziói csak számok lehetnek.');
    });
  });

  describe('fillWithRandomNumbers', () => {
    it('should fill matrix with random numbers within range', () => {
      const matrix = new Matrix(2, 2);
      matrix.fillWithRandomNumbers(1, 5);
      
      // Check if all numbers are within range
      matrix.getData().forEach(row => {
        row.forEach(value => {
          expect(value).toBeGreaterThanOrEqual(1);
          expect(value).toBeLessThanOrEqual(5);
        });
      });
    });

    it('should throw error for non-numeric range', () => {
      const matrix = new Matrix(2, 2);
      expect(() => matrix.fillWithRandomNumbers('1', 5)).toThrow('A min és max értékeknek számoknak kell lennie.');
      expect(() => matrix.fillWithRandomNumbers(1, '5')).toThrow('A min és max értékeknek számoknak kell lennie.');
    });
  });

  describe('setElement', () => {
    it('should set element at given position', () => {
      const matrix = new Matrix(2, 2);
      matrix.setElement(0, 0, 5);
      expect(matrix.getData()[0][0]).toBe(5);
    });

    it('should throw error for invalid indices', () => {
      const matrix = new Matrix(2, 2);
      expect(() => matrix.setElement(-1, 1, 5)).toThrow('A sor és oszlop számoknak pozitív számoknak kell lennie.');
      expect(() => matrix.setElement(3, 1, 5)).toThrow('A sor és oszlop számoknak a mátrix határain belül kell lennie.');
    });

    it('should throw error for non-numeric value', () => {
      const matrix = new Matrix(2, 2);
      expect(() => matrix.setElement(1, 1, '5')).toThrow('A hozzáadandó értéknek számnak kell lennie.');
    });
  });

  describe('toString', () => {
    it('should convert matrix to string representation', () => {
      const matrix = new Matrix(2, 2);
      matrix.setElement(0, 0, 1)
            .setElement(0, 1, 2)
            .setElement(1, 0, 3)
            .setElement(1, 1, 4);
      expect(matrix.toString()).toBe('1 2\n3 4');
    });
  });

  describe('method chaining', () => {
    it('should support method chaining', () => {
      const matrix = new Matrix(2, 2);
      expect(() => {
        matrix.fillWithRandomNumbers(1, 5)
              .setElement(0, 0, 3)
              .toString();
      }).not.toThrow();
    });
  });
}); 