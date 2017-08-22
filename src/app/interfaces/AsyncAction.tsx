import { IAction } from './Action';
export type IAsyncAction<R, S, E> = (dispatch: () => IAction<E>,
                                     getState: () => S,
                                     extraArgument: E) => void;
