import { Middleware } from 'redux';
import {
  IAction,
  IAsyncAction
} from '../interfaces';
import {
  PROCESS_ERROR_SUFFIX,
  PROCESS_START_SUFFIX,
  PROCESS_SUCCESS_SUFFIX,
  START_PROCESS,
  startProcess,
  STOP_PROCESS,
  stopProcess
} from '../actions';
export const processManager: Middleware = store =>
  next =>
    (action: IAction<any> | IAsyncAction<any, any, any>) => {
      const theAction: IAction<any> = action as IAction<any>;
      if (theAction.type && theAction.type !== START_PROCESS && theAction.type !== STOP_PROCESS) {
        if (new RegExp(`${PROCESS_START_SUFFIX}$`).test(theAction.type)) {
          const startedProcess = startProcess(theAction.id);
          theAction.process = startedProcess.value;
          store.dispatch(startedProcess);
        } else if (new RegExp(`${PROCESS_SUCCESS_SUFFIX}$`).test(theAction.type) ||
        new RegExp(`${PROCESS_ERROR_SUFFIX}$`).test(theAction.type)) {
          store.dispatch(stopProcess(theAction.id, theAction.process!));
        }
      }
      next(theAction);
    };
