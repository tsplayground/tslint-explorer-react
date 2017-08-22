import { IAction } from './Action';
import { IAsyncAction } from './AsyncAction';
export type IDispatcher<T> = (action: IAction<T> | IAsyncAction<any, T, any>) => any;
