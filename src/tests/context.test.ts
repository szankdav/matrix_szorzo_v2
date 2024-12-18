import { describe, it } from "vitest";
import { expect, vi } from "vitest";
import { Context } from "../classes/context";
import { State } from "../interfaces/state";

describe('context tests', () => {
    it('should set currentState', () => {
        const mockCurrentState = {
            run: vi.fn(),
            next: vi.fn(),
        } as unknown as State;

        const mockInitialState = {
            run: vi.fn(),
            next: vi.fn(),
        } as unknown as State;

        const context = new Context();
        Object.defineProperty(mockInitialState, "currentState", {
            value: mockCurrentState,
        })

        Object.defineProperty(mockInitialState, "initialState", {
            value: mockInitialState,
        })

        expect(context.getCurrentState()).toBe(null);
        context.setCurrentState(mockCurrentState);
        expect(context.getCurrentState()).toBe(mockCurrentState);
    })

    it('should get currentState', () => {
        const mockCurrentState = {
            run: vi.fn(),
            next: vi.fn(),
        } as unknown as State;

        const mockInitialState = {
            run: vi.fn(),
            next: vi.fn(),
        } as unknown as State;

        const context = new Context();
        Object.defineProperty(mockInitialState, "currentState", {
            value: mockCurrentState,
        })

        Object.defineProperty(mockInitialState, "initialState", {
            value: mockInitialState,
        })

        let currentState: State | null = context.getCurrentState();
        expect(currentState).toBe(null);
        context.setCurrentState(mockCurrentState);
        currentState = context.getCurrentState();
        expect(currentState).toBe(mockCurrentState);
    })

    it('should set initialState', () => {
        const mockCurrentState = {
            run: vi.fn(),
            next: vi.fn(),
        } as unknown as State;

        const mockInitialState = {
            run: vi.fn(),
            next: vi.fn(),
        } as unknown as State;

        const context = new Context();
        Object.defineProperty(mockInitialState, "currentState", {
            value: mockCurrentState,
        })

        Object.defineProperty(mockInitialState, "initialState", {
            value: mockInitialState,
        })

        expect(context.getInitialState()).toBe(null);
        context.setInitialState(mockInitialState);
        expect(context.getInitialState()).toBe(mockInitialState);
    })

    it('should get initialState', () => {
        const mockCurrentState = {
            run: vi.fn(),
            next: vi.fn(),
        } as unknown as State;

        const mockInitialState = {
            run: vi.fn(),
            next: vi.fn(),
        } as unknown as State;

        const context = new Context();
        Object.defineProperty(mockInitialState, "currentState", {
            value: mockCurrentState,
        })

        Object.defineProperty(mockInitialState, "initialState", {
            value: mockInitialState,
        })

        let initialState: State | null = context.getInitialState();
        expect(initialState).toBe(null);
        context.setInitialState(mockInitialState);
        initialState = context.getInitialState();
        expect(initialState).toBe(mockInitialState);
    })

    // it('should call currentState.next()', async () => {
    //     const mockCurrentState = {
    //         run: vi.fn(),
    //         next: vi.fn().mockResolvedValue(null),
    //     } as unknown as State;

    //     const mockInitialState = {
    //         run: vi.fn(),
    //         next: vi.fn(),
    //     } as unknown as State;

    //     const context = new Context();
    //     vi.spyOn(context, "next");
    //     Object.defineProperty(mockInitialState, "currentState", {
    //         value: mockCurrentState,
    //     })

    //     Object.defineProperty(mockInitialState, "initialState", {
    //         value: mockInitialState,
    //     })

    //     await context.next();
    //     expect(mockCurrentState.next).toHaveBeenCalled();
    // })
})