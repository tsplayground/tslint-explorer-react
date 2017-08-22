import { Action } from 'redux';
import { IProcess } from './Process';
export interface IAction<T> extends Action {
  id: string;
  process?: IProcess;
  value?: T;
}
