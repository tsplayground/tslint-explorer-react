const namespace: string = 'TSLINT_RULES';
const CODELYZER_RULES = [
  'angular-whitespace',
  'banana-in-box',
  'component-class-suffix',
  'component-selector',
  'directive-class-suffix',
  'directive-selector',
  'import-destructing-spacing',
  'invoke-injectable',
  'no-access-missing-member',
  'no-attribute-parameter-decorator',
  'no-forward-ref',
  'no-input-rename',
  'no-output-rename',
  'no-unused-css-rule',
  'pipe-impure',
  'pipe-naming',
  'template-to-ng-template',
  'templates-no-negated-async',
  'templates-use-public',
  'use-host-property-decorator',
  'use-input-property-decorator',
  'use-life-cycle-interface',
  'use-output-property-decorator',
  'use-pipe-decorator',
  'use-pipe-transform-interface',
  'use-view-encapsulation'
];
import {
  IAction,
  IAsyncAction,
  IDispatcher,
  ITSLintRule
} from '../interfaces';
import {
  PROCESS_ERROR_SUFFIX,
  PROCESS_START_SUFFIX,
  PROCESS_SUCCESS_SUFFIX
} from './App';

export const SET_VISIBILITY_FILTER = `${namespace}_SET_VISIBILITY_FILTER`;
export const FETCH_RULES = `${namespace}_FETCH_RULES`;
export const FETCH_RULES_ERROR = FETCH_RULES + PROCESS_ERROR_SUFFIX;
export const FETCH_RULES_START = FETCH_RULES + PROCESS_START_SUFFIX;
export const FETCH_RULES_SUCCESS = FETCH_RULES + PROCESS_SUCCESS_SUFFIX;
export const LOAD_RULE_DETAIL = `${namespace}_LOAD_RULE_DETAIL`;
export const LOAD_RULE_DETAIL_ERROR = LOAD_RULE_DETAIL + PROCESS_ERROR_SUFFIX;
export const LOAD_RULE_DETAIL_START = LOAD_RULE_DETAIL + PROCESS_START_SUFFIX;
export const LOAD_RULE_DETAIL_SUCCESS = LOAD_RULE_DETAIL + PROCESS_SUCCESS_SUFFIX;
export const FILTER_ALL = `${SET_VISIBILITY_FILTER}$SHOW_ALL`;
export const FILTER_APPROVED = `${SET_VISIBILITY_FILTER}$SHOW_APPROVED`;
export const FILTER_MARKED_AS_EXPERIMENTAL = `${SET_VISIBILITY_FILTER}$SHOW_MARKED_AS_EXPERIMENTAL`;

export function setVisibilityFilter(id: string, filter: string): IAction<string> {
  return {
    id,
    type: SET_VISIBILITY_FILTER,
    value: filter
  };
}

export function fetchRulesFromJSON(id: string,
                                   value?: any): IAsyncAction<void, any, ITSLintRule[]> {
  return (dispatch: IDispatcher<ITSLintRule[] | Error>) => {
    dispatch(fetchRulesStart(id));
    if (!value) {
      fetch('./tslint.json')
        .then(response => {
          const contentType = response.headers.get('content-type');
          if (contentType && contentType.includes('application/json')) {
            return response.json();
          }
          throw new TypeError("Oops, we haven't got JSON!");
        })
        .then(configs => {
          const rules = Object.keys(configs.rules).sort().map(key => {
            const isCodelyzerPlugin = (CODELYZER_RULES.indexOf(key) !== -1);
            const rule: ITSLintRule = {
              id: key,
              isSubmitted: false,
              isToggled: false,
              key,
              plugin: isCodelyzerPlugin ? 'codelyzer' : '',
              url: !isCodelyzerPlugin ? `https://palantir.github.io/tslint/rules/${key}` :
                `http://codelyzer.com/rules/${key}`,
              value: JSON.stringify(configs.rules[key])
            };
            return rule;
          });
          dispatch(fetchRulesSuccess(id, rules));
        })
        .catch(error => { console.error(error); });
    } else {
      if (!value.rules) {
        dispatch(fetchRulesError(id, new Error('JSON file format is invalid')));
      } else {
        dispatch(fetchRulesSuccess(id, value.rules));
      }
    }
  };
}

export function loadRuleDetail(id: string, value?: any): IAsyncAction<void, any, any> {
  return (dispatch: IDispatcher<any>) => {
    dispatch(loadRuleDetailStart(id, value));
    const iframe = value.iframe as HTMLIFrameElement;
    if (!iframe || !value.url) {
      dispatch(loadRuleDetailError(id, new Error('Iframe or iframe \'s src is undefined')));
    } else {
      const timeout = setTimeout(() => {
        dispatch(loadRuleDetailError(id, new Error('Iframe loading timed out')));
      }, value.timeout || 10000);
      iframe.onload = () => {
        dispatch(loadRuleDetailSuccess(id, value));
        clearTimeout(timeout);
      };
      iframe.src = value.url;
    }
  };
}

function fetchRulesError(id: string, value: Error): IAction<Error> {
  return { type: FETCH_RULES_ERROR, value, id };
}

function fetchRulesStart(id: string, value?: ITSLintRule[]): IAction<ITSLintRule[]> {
  return { type: FETCH_RULES_START, value, id };
}

function fetchRulesSuccess(id: string, value?: ITSLintRule[]): IAction<ITSLintRule[]> {
  return { type: FETCH_RULES_SUCCESS, value, id };
}

function loadRuleDetailError(id: string, value?: Error): IAction<Error> {
  return { type: LOAD_RULE_DETAIL_ERROR, value, id };
}

function loadRuleDetailStart(id: string, value?: any): IAction<any> {
  return { type: LOAD_RULE_DETAIL_START, value, id };
}

function loadRuleDetailSuccess(id: string, value?: any): IAction<any> {
  return { type: LOAD_RULE_DETAIL_SUCCESS, value, id };
}
