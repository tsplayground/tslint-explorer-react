import { combineReducers } from 'redux';
import {
  tsLintRuleDetailsReducer,
  tsLintRulesReducer,
  tsLintRulesVisibilityReducer
} from './TSLintRulesReducer';
import {
  IAction,
  IProcess
} from '../interfaces';

import {
  START_PROCESS as APP_START_PROCESS,
  STOP_PROCESS as APP_STOP_PROCESS
} from '../actions';

import { v4 as uuidV4 } from 'uuid';

export function appProcessReducer(state: IProcess[] = [], action: IAction<IProcess>): IProcess[] {
  switch (action.type) {
    case APP_START_PROCESS: {
      return [
        ...state,
        {
          actionID: action.value!.actionID || action.id,
          id: action.value!.id || uuidV4()
        }
      ];
    }
    case APP_STOP_PROCESS: {
      if (typeof action.value !== 'undefined') {
        return state;
      }
      return state.filter(process => process.actionID !== action.id);
    }
  }
  return state;
}

export const appReducer = combineReducers({
  appProcessReducer,
  tsLintRuleDetailsReducer,
  tsLintRulesReducer,
  tsLintRulesVisibilityReducer
});
