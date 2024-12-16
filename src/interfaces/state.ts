export interface State {
    run(): void,
    next(): Promise<void | null>,
}