export interface State {
    next(): Promise<void | null>,
}