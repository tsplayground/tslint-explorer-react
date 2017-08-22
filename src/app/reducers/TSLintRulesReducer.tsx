import {
  ADD_PANEL as EXPANSION_PANEL_ADD,
  CANCEL_PANEL as EXPANSION_PANEL_CANCEL,
  CLOSE_PANEL as EXPANSION_PANEL_CLOSE,
  OPEN_PANEL as EXPANSION_PANEL_OPEN,
  SUBMIT_PANEL as EXPANSION_PANEL_SUBMIT
} from '../../md';

import {
  FETCH_RULES_ERROR,
  FETCH_RULES_SUCCESS,
  FILTER_ALL,
  LOAD_RULE_DETAIL_ERROR,
  LOAD_RULE_DETAIL_SUCCESS,
  SET_VISIBILITY_FILTER
} from '../actions';
import {
  IAction,
  ITSLintRule
} from '../interfaces';

export function tsLintRulesReducer(state: ITSLintRule[] = [], action: IAction<any>): ITSLintRule[] {
  switch (action.type) {
    case EXPANSION_PANEL_ADD: {
      const props = action.value;
      return state.find(rule => rule.key === action.id) ? state : [
        ...state,
        {
          id: action.id,
          isSubmitted: props.isSubmitted || false,
          isToggled: props.isToggled || false,
          key: props.id,
          plugin: props.plugin,
          status: props.status,
          url: props.url,
          value: props.value
        }
      ];
    }
    case EXPANSION_PANEL_CANCEL: {
      return state.map(rule => {
        if (rule.id === action.id) {
          return {
            ...rule,
            isSubmitted: false
          };
        }
        return rule;
      });
    }
    case EXPANSION_PANEL_SUBMIT: {
      return state.map(rule => {
        if (rule.id === action.id) {
          return {
            ...rule,
            isSubmitted: true
          };
        }
        return rule;
      });
    }
    case EXPANSION_PANEL_CLOSE: {
      return state.map(rule => {
        if (rule.id === action.id) {
          return {
            ...rule,
            isToggled: false
          };
        }
        return rule;
      });
    }
    case EXPANSION_PANEL_OPEN: {
      return state.map(rule => {
        if (rule.id === action.id) {
          return {
            ...rule,
            isToggled: true
          };
        }
        return {
          ...rule,
          isToggled: false
        };
      });
    }
    case FETCH_RULES_ERROR: {
      return [];
    }
    case FETCH_RULES_SUCCESS: {
      return action.value;
    }
    default: {
      return state;
    }
  }
}

export function tsLintRulesVisibilityReducer(state: string = FILTER_ALL,
                                             action: IAction<string>): string {
  switch (action.type) {
    case SET_VISIBILITY_FILTER: {
      return action.value!;
    }
    default: {
      return state;
    }
  }
}

export function tsLintRuleDetailsReducer(state: any = {}, action: IAction<any>): any {
  switch (action.type) {
    case LOAD_RULE_DETAIL_ERROR: {
      return state;
    }
    case LOAD_RULE_DETAIL_SUCCESS: {
      return action.value;
    }
    default: {
      return state;
    }
  }
}
