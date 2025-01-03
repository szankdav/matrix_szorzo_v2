import { describe, expect, it, vi } from "vitest";
import { ModeState } from "./mode.state";
import { Context } from "../core/context";
import { TerminalReader } from "../core/terminalReader";
import { UserMatrixADimensionsInputState } from "./userMatrixADimensionsInput.state";
import { AutomateMatrixAState } from "./automateMatrixA.state";

describe('ModeState tests', () => {
    const MODE_MSG = "Kérem válasszon az alábbi lehetőségek közül:";
    const RANDOM_MSG = "'A' (automatikus): a program automatikusan, véletlenszerű dimenziókkal és adatokkal létrehoz két mátrixot, majd elvégzi a szorzást. Minden lépés megjelenítésre kerül a konzolon.";
    const USER_MSG = "'M' (manuális): a program a felhasználótól kéri be az adatokat, majd elvégzi a szorzást. Minden lépés megjelenítésre kerül a konzolon.";
    const EXIT_MSG = "'K' (kilépés): a program kilép.";
    const MODE_CHOOSE_MSG = "Válaszott mód: ['A'/'M'/'K']: ";

    it("should call displayText with the given message", async () => {
        const contextMock = {
            setCurrentState: vi.fn(),
            getCurrentState: vi.fn(),
        }

        const terminalReaderMock = {
            askQuestion: vi.fn(),
            displayText: vi.fn(),
        };

        terminalReaderMock.askQuestion.mockResolvedValue('k');
        contextMock.getCurrentState.mockReturnValue(null);
        const modeState = new ModeState(contextMock as unknown as Context, terminalReaderMock as unknown as TerminalReader);
        await modeState.next();

        expect(terminalReaderMock.displayText).toHaveBeenCalledWith(MODE_MSG);
        expect(terminalReaderMock.displayText).toHaveBeenCalledWith(RANDOM_MSG);
        expect(terminalReaderMock.displayText).toHaveBeenCalledWith(USER_MSG);
        expect(terminalReaderMock.displayText).toHaveBeenCalledWith(EXIT_MSG);
    })

    it("should set context's currentState to null if answer is 'k' or 'K'", async () => {
        const contextMock = {
            setCurrentState: vi.fn(),
            getCurrentState: vi.fn(),
        }

        const terminalReaderMock = {
            askQuestion: vi.fn(),
            displayText: vi.fn(),
        };

        terminalReaderMock.askQuestion.mockResolvedValue('k');
        contextMock.getCurrentState.mockReturnValue(null);
        const modeState = new ModeState(contextMock as unknown as Context, terminalReaderMock as unknown as TerminalReader);
        await modeState.next();

        expect(terminalReaderMock.askQuestion).toHaveBeenCalledWith(MODE_CHOOSE_MSG);
        expect(contextMock.setCurrentState).toHaveBeenCalledWith(null);
        expect(contextMock.getCurrentState()).toBe(null);
    })

    it("should call askQuestion again if answer is not 'k' or 'K'", async () => {
        const contextMock = {
            setCurrentState: vi.fn(),
            getCurrentState: vi.fn(),
        }

        const terminalReaderMock = {
            askQuestion: vi.fn(),
            displayText: vi.fn(),
        };

        terminalReaderMock.askQuestion.mockResolvedValue('k').mockResolvedValueOnce('f');
        const modeState = new ModeState(contextMock as unknown as Context, terminalReaderMock as unknown as TerminalReader);
        await modeState.next();

        expect(terminalReaderMock.askQuestion).toHaveBeenCalledWith(MODE_CHOOSE_MSG);
        expect(terminalReaderMock.askQuestion).toHaveBeenCalledTimes(2);
    })

    it("should set context's currentState to userMatrixADimensionsInputState if answer is 'm' or 'M'", async () => {
        const contextMock = {
            setCurrentState: vi.fn(),
            getCurrentState: vi.fn(),
        }

        const terminalReaderMock = {
            askQuestion: vi.fn(),
            displayText: vi.fn(),
        };

        terminalReaderMock.askQuestion.mockResolvedValue('m');
        contextMock.getCurrentState.mockReturnValue(new UserMatrixADimensionsInputState(contextMock as unknown as Context, terminalReaderMock as unknown as TerminalReader));

        const modeState = new ModeState(contextMock as unknown as Context, terminalReaderMock as unknown as TerminalReader);
        await modeState.next();
        expect(terminalReaderMock.askQuestion).toHaveBeenCalledWith(MODE_CHOOSE_MSG);
        expect(contextMock.setCurrentState).toHaveBeenCalledWith(new UserMatrixADimensionsInputState(contextMock as unknown as Context, terminalReaderMock as unknown as TerminalReader));
        expect(contextMock.getCurrentState()).toBeInstanceOf(UserMatrixADimensionsInputState);
    })

    it("should call askQuestion again if answer is not 'm' or 'M'", async () => {
        const contextMock = {
            setCurrentState: vi.fn(),
            getCurrentState: vi.fn(),
        }

        const terminalReaderMock = {
            askQuestion: vi.fn(),
            displayText: vi.fn(),
        };

        terminalReaderMock.askQuestion.mockResolvedValue('m').mockResolvedValueOnce('r');

        const modeState = new ModeState(contextMock as unknown as Context, terminalReaderMock as unknown as TerminalReader);
        await modeState.next();
        expect(terminalReaderMock.askQuestion).toHaveBeenCalledWith(MODE_CHOOSE_MSG);
        expect(terminalReaderMock.askQuestion).toHaveBeenCalledTimes(2);
    })

    it("should set context's currentState to automateMatrixAState if answer is 'a' or 'A'", async () => {
        const contextMock = {
            setCurrentState: vi.fn(),
            getCurrentState: vi.fn(),
        }

        const terminalReaderMock = {
            askQuestion: vi.fn(),
            displayText: vi.fn(),
        };

        terminalReaderMock.askQuestion.mockResolvedValue('a');
        contextMock.getCurrentState.mockReturnValue(new AutomateMatrixAState(contextMock as unknown as Context, terminalReaderMock as unknown as TerminalReader));

        const modeState = new ModeState(contextMock as unknown as Context, terminalReaderMock as unknown as TerminalReader);
        await modeState.next();
        expect(terminalReaderMock.askQuestion).toHaveBeenCalledWith(MODE_CHOOSE_MSG);
        expect(contextMock.setCurrentState).toHaveBeenCalledWith(new AutomateMatrixAState(contextMock as unknown as Context, terminalReaderMock as unknown as TerminalReader));
        expect(contextMock.getCurrentState()).toBeInstanceOf(AutomateMatrixAState);
    })

    it("should call askQuestion again if answer is not 'a' or 'A'", async () => {
        const contextMock = {
            setCurrentState: vi.fn(),
            getCurrentState: vi.fn(),
        }

        const terminalReaderMock = {
            askQuestion: vi.fn(),
            displayText: vi.fn(),
        };

        terminalReaderMock.askQuestion.mockResolvedValue('a').mockResolvedValueOnce('r');

        const modeState = new ModeState(contextMock as unknown as Context, terminalReaderMock as unknown as TerminalReader);
        await modeState.next();
        expect(terminalReaderMock.askQuestion).toHaveBeenCalledWith(MODE_CHOOSE_MSG);
        expect(terminalReaderMock.askQuestion).toHaveBeenCalledTimes(2);
    })
})