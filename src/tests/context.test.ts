import { describe, it } from "vitest";
import { expect, vi } from "vitest";
import { Context } from "../classes/context";
import { State } from "../interfaces/state";

describe('context tests', () => {
    it('should get the currentState from context when getCurrentState called', () => {
        const mockCurrentState = {
            run: vi.fn(),
            next: vi.fn(),
        } as unknown as State;

        const context = new Context();
        Object.defineProperty(mockCurrentState, "currentState", {
            value: mockCurrentState,
        })

        expect(context.getCurrentState()).toBe(null);
        context.setCurrentState(mockCurrentState);
        expect(context.getCurrentState()).toBe(mockCurrentState);
    })

    it('should get the currentState from context when getCurrentState called', () => {
        const mockCurrentState = {
            run: vi.fn(),
            next: vi.fn(),
        } as unknown as State;

        const context = new Context();
        Object.defineProperty(mockCurrentState, "currentState", {
            value: mockCurrentState,
        })

        let currentState: State | null = context.getCurrentState();
        expect(currentState).toBe(null);
        context.setCurrentState(mockCurrentState);
        currentState = context.getCurrentState();
        expect(currentState).toBe(mockCurrentState);
    })

    it('should set the initialState from context when setInitialState called', () => {
        const mockInitialState = {
            run: vi.fn(),
            next: vi.fn(),
        } as unknown as State;

        const context = new Context();

        Object.defineProperty(mockInitialState, "initialState", {
            value: mockInitialState,
        })

        expect(context.getInitialState()).toBe(null);
        context.setInitialState(mockInitialState);
        expect(context.getInitialState()).toBe(mockInitialState);
    })

    it('should get the initialState from context when getInitialState called', () => {
        const mockInitialState = {
            run: vi.fn(),
            next: vi.fn(),
        } as unknown as State;

        const context = new Context();

        Object.defineProperty(mockInitialState, "initialState", {
            value: mockInitialState,
        })

        let initialState: State | null = context.getInitialState();
        expect(initialState).toBe(null);
        context.setInitialState(mockInitialState);
        initialState = context.getInitialState();
        expect(initialState).toBe(mockInitialState);
    })

    it('should resolve context.next() with currentState.next() ', async () => {
        const mockCurrentState = {
            run: vi.fn(),
            next: vi.fn().mockResolvedValue(null),
        } as unknown as State;

        const context = new Context();
        vi.spyOn(context, "next").mockResolvedValue(await mockCurrentState.next());

        Object.defineProperty(mockCurrentState, "currentState", {
            value: mockCurrentState,
        })

        await context.next();
        expect(context.next).toHaveResolvedWith(null);
    })
})