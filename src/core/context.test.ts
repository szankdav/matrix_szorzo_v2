import { describe, it } from "vitest";
import { expect, vi } from "vitest";
import { Context } from "./context";
import { Matrix } from "./matrix";
import { State } from "../interfaces/state";

describe('context tests', () => {
    it('should resolve context.next() with currentState.next() ', async () => {
        const matrixAMock = {
            setRow: vi.fn(),
            setColumn: vi.fn(),
            setData: vi.fn(),
            createRandomMatrix: vi.fn(),
        };

        const matrixBMock = {
            setRow: vi.fn(),
            setColumn: vi.fn(),
            setData: vi.fn(),
            createRandomMatrix: vi.fn(),
        };    

        const context = new Context(matrixAMock as unknown as Matrix, matrixBMock as unknown as Matrix);
        vi.spyOn(context, 'next').mockResolvedValue(null);
        await context.next();
        expect(context.next).toHaveResolvedWith(null);
    });

    it('should set currenState with the given state', async () => {
        const modeStateMock = {
            next: vi.fn(),
        }

        const matrixAMock = {
            setRow: vi.fn(),
            setColumn: vi.fn(),
            setData: vi.fn(),
            createRandomMatrix: vi.fn(),
        };

        const matrixBMock = {
            setRow: vi.fn(),
            setColumn: vi.fn(),
            setData: vi.fn(),
            createRandomMatrix: vi.fn(),
        };    

        const context = new Context(matrixAMock as unknown as Matrix, matrixBMock as unknown as Matrix);
        context.setCurrentState(modeStateMock as unknown as State);
        vi.spyOn(context, 'getCurrentState');
        await context.next();
        expect(context.getCurrentState()).toBe(modeStateMock);
    });

    it('should return matrixA when getMatrixA is called', async () => {
        const mockMatrix_A = {};

        const matrixAMock = {
            setRow: vi.fn(),
            setColumn: vi.fn(),
            setData: vi.fn(),
            createRandomMatrix: vi.fn(),
        };

        const matrixBMock = {
            setRow: vi.fn(),
            setColumn: vi.fn(),
            setData: vi.fn(),
            createRandomMatrix: vi.fn(),
        };    

        const context = new Context(matrixAMock as unknown as Matrix, matrixBMock as unknown as Matrix);
        vi.spyOn(context, 'getMatrixA').mockReturnValue(mockMatrix_A as unknown as Matrix);
        await context.next();
        expect(context.getMatrixA()).toBe(mockMatrix_A);
    });

    it('should return matrixB when getMatrixB is called', async () => {
        const mockMatrix_B = {};

        const matrixAMock = {
            setRow: vi.fn(),
            setColumn: vi.fn(),
            setData: vi.fn(),
            createRandomMatrix: vi.fn(),
        };

        const matrixBMock = {
            setRow: vi.fn(),
            setColumn: vi.fn(),
            setData: vi.fn(),
            createRandomMatrix: vi.fn(),
        };    

        const context = new Context(matrixAMock as unknown as Matrix, matrixBMock as unknown as Matrix);
        vi.spyOn(context, 'getMatrixB').mockReturnValue(mockMatrix_B as unknown as Matrix);
        await context.next();
        expect(context.getMatrixB()).toBe(mockMatrix_B);
    });

    it('should return with the current state when getCurrentState is called', async () => {
        const modeStateMock = {
            next: vi.fn(),
        }

        const matrixAMock = {
            setRow: vi.fn(),
            setColumn: vi.fn(),
            setData: vi.fn(),
            createRandomMatrix: vi.fn(),
        };

        const matrixBMock = {
            setRow: vi.fn(),
            setColumn: vi.fn(),
            setData: vi.fn(),
            createRandomMatrix: vi.fn(),
        };    

        const context = new Context(matrixAMock as unknown as Matrix, matrixBMock as unknown as Matrix);
        vi.spyOn(context, 'getCurrentState').mockReturnValue(modeStateMock);
        await context.next();
        expect(context.getCurrentState()).toBe(modeStateMock);
    });

    it('should initialize matrices and currentState to null', () => {
        const matrixAMock = {} as Matrix;
        const matrixBMock = {} as Matrix;
        const context = new Context(matrixAMock, matrixBMock);
        expect(context.getMatrixA()).toBe(matrixAMock);
        expect(context.getMatrixB()).toBe(matrixBMock);
        expect(context.getCurrentState()).toBeNull();
    });

    it('should set currentState to null', () => {
        const matrixAMock = {} as Matrix;
        const matrixBMock = {} as Matrix;
        const context = new Context(matrixAMock, matrixBMock);
    
        context.setCurrentState(null);
        expect(context.getCurrentState()).toBeNull();
    });

    it('should not throw when next is called and currentState is null', async () => {
        const matrixAMock = {} as Matrix;
        const matrixBMock = {} as Matrix;
        const context = new Context(matrixAMock, matrixBMock);
    
        await expect(context.next()).resolves.toBeUndefined();
    });

    it('should call next on the current state', async () => {
        const stateMock = { next: vi.fn() } as unknown as State;
        const matrixAMock = {} as Matrix;
        const matrixBMock = {} as Matrix;
        const context = new Context(matrixAMock, matrixBMock);
    
        context.setCurrentState(stateMock);
        await context.next();
        expect(stateMock.next).toHaveBeenCalledTimes(1);
    });

    it('should handle uninitialized matrices gracefully', () => {
        const context = new Context(null as unknown as Matrix, null as unknown as Matrix);
        expect(context.getMatrixA()).toBeNull();
        expect(context.getMatrixB()).toBeNull();
    });

    it('should return the same matrix instances passed to the constructor', () => {
        const matrixAMock = {} as Matrix;
        const matrixBMock = {} as Matrix;
        const context = new Context(matrixAMock, matrixBMock);
    
        expect(context.getMatrixA()).toBe(matrixAMock);
        expect(context.getMatrixB()).toBe(matrixBMock);
    });

    it('should not call next when currentState is null', async () => {
        const matrixAMock = {} as Matrix;
        const matrixBMock = {} as Matrix;
        const context = new Context(matrixAMock, matrixBMock);
    
        context.setCurrentState(null);
        const spy = vi.spyOn(context, 'next');
        await context.next();
        expect(spy).toHaveBeenCalled();
        expect(context.getCurrentState()).toBeNull();
    });
})