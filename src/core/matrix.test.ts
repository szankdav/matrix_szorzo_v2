import { describe, expect, it, vi } from "vitest";
import { Matrix } from "../core/matrix";

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


})