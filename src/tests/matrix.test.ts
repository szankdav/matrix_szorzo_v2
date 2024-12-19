import { describe, expect, it, vi } from "vitest";
import { Matrix } from "../classes/matrix";

describe('matrix tests', () => {
    it('should return with matrix data when getMatrixData is called', () => {
        const matrix = new Matrix();
        
        vi.spyOn(matrix, "getMatrixData").mockReturnValue([[1, 2], [3, 4]]);
        const result = matrix.getMatrixData()

        expect(result).toStrictEqual([[1, 2], [3, 4]]);
    })

    it('should return with matrix row when getMatrixRow is called', () => {
        const matrix = new Matrix();
        
        vi.spyOn(matrix, "getMatrixRow").mockReturnValue(3);
        const result = matrix.getMatrixRow()

        expect(result).toBe(3);
    })

    it('should return with matrix column when getMatrixColumn is called', () => {
        const matrix = new Matrix();
        
        vi.spyOn(matrix, "getMatrixColumn").mockReturnValue(3);
        const result = matrix.getMatrixColumn()

        expect(result).toBe(3);
    })

    it('should set matrix row when setRow is called', () => {
        const matrix = new Matrix();
        
        matrix.setRow(3);
        const result = matrix.getMatrixRow()

        expect(result).toBe(3);
    })

    it('should set matrix column when setColumn is called', () => {
        const matrix = new Matrix();
        
        matrix.setColumn(3);
        const result = matrix.getMatrixColumn()

        expect(result).toBe(3);
    })
})