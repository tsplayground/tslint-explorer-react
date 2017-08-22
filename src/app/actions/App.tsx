import {
  IAction,
  IProcess
} from '../interfaces';
import { v4 as uuidV4 } from 'uuid';
const namespace = 'APP';
export const START_PROCESS = `${namespace}_START_PROCESS`;
export const STOP_PROCESS = `${namespace}_STOP_PROCESS`;
export const PROCESS_START_SUFFIX = '::START';
export const PROCESS_ERROR_SUFFIX = '::ERROR';
export const PROCESS_SUCCESS_SUFFIX = '::SUCCESS';
export function startProcess(id: string, value?: IProcess): IAction<IProcess> {
  return {
    id,
    type: START_PROCESS,
    value: {
      actionID: id,
      id: value ? value.id : uuidV4()
    }
  };
}

export function stopProcess(id: string, value: IProcess): IAction<IProcess> {
  return {
    id,
    type: STOP_PROCESS,
    value
  };
}
