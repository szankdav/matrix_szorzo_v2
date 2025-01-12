import { describe, expect, it, vi } from "vitest";
import { Matrix } from "./matrix";

describe('matrix tests', () => {
    it('should return with matrix data when getMatrixData is called', () => {
        const mockMatrix = {
            getMatrixData: vi.fn().mockReturnValue([[1, 2], [3, 4]]),
        }

        const result = mockMatrix.getMatrixData();

        expect(result).toStrictEqual([[1, 2], [3, 4]]);
    })

    it('should return with matrix row when getMatrixRow is called', () => {
        const mockMatrix = {
            getMatrixRow: vi.fn().mockReturnValue(3),
        }

        const result = mockMatrix.getMatrixRow()

        expect(result).toBe(3);
    })

    it('should return with matrix column when getMatrixColumn is called', () => {
        const mockMatrix = {
            getMatrixColumn: vi.fn().mockReturnValue(3),
        }

        const result = mockMatrix.getMatrixColumn()

        expect(result).toBe(3);
    })

    it('should set matrix row when setRow is called', () => {
        const mockMatrix = {
            setRow: vi.fn().mockReturnValue(3),
            getMatrixRow: vi.fn(() => mockMatrix.setRow()),
        }

        const result = mockMatrix.getMatrixRow()

        expect(result).toBe(3);
    })

    it('should populate the matrix with the given rows when setRow is called', () => {
        const mockMatrix = {
            getMatrixRow: vi.fn().mockReturnValue(3),
            data: [[], []],
            setData: function () {
                this.data = Array(this.getMatrixRow()).fill(null).map(() => []);
            }
        }

        mockMatrix.setData();
        mockMatrix.data.forEach((row) => {
            expect(row).toEqual([]);
        });
    })

    it('should set matrix column when setColumn is called', () => {
        const mockMatrix = {
            setColumn: vi.fn().mockReturnValue(3),
            getMatrixColumn: vi.fn(() => mockMatrix.setColumn()),
        }
        const result = mockMatrix.getMatrixColumn()

        expect(result).toBe(3);
    })

    it('should return with a random matrix when createRandomMatrix is called', () => {
        const matrix = new Matrix();
        matrix.createRandomMatrix();
        expect(matrix.getMatrixRow()).toBeGreaterThan(0);
        expect(matrix.getMatrixColumn()).toBeGreaterThan(0);
        expect(matrix.getMatrixData()).not.toEqual([[], []]);
    })

    it('should initialize row and column to zero, and data to an empty two-dimensional array when constructor is called', () => {
        const matrix = new Matrix();
        expect(matrix.getMatrixRow()).toEqual(0);
        expect(matrix.getMatrixColumn()).toEqual(0);
        expect(matrix.getMatrixData()).toEqual([[], []]);
    })

    it('should print to console the matrix when toString() is called', () => {
        const consoleLogSpy = vi.spyOn(console, "log").mockImplementation(() => { });

        const matrix = new Matrix();

        matrix.setRow(2);
        matrix.setColumn(3);
        matrix.setData();

        const data = matrix.getMatrixData();
        data[0] = [1, 2, 3];
        data[1] = [4, 5, 6];

        const expectedLogs = [
            "\t1. oszlop: \t2. oszlop: \t3. oszlop: ",
            "1. sor: 1\t\t2\t\t3\t\t",
            "\t1. oszlop: \t2. oszlop: \t3. oszlop: ",
            "2. sor: 4\t\t5\t\t6\t\t",
        ];

        matrix["toString"]();

        expectedLogs.forEach((log, index) => {
            expect(consoleLogSpy).toHaveBeenNthCalledWith(index + 1, log);
        });

        consoleLogSpy.mockRestore();
    })
})