import { connect } from 'react-redux';
import {
  addPanel,
  cancelPanel,
  closePanel,
  openPanel,
  submitPanel
} from '../../md';
import { TSLintRules } from '../components';
import {
  fetchRulesFromJSON,
  FILTER_ALL,
  FILTER_APPROVED,
  FILTER_MARKED_AS_EXPERIMENTAL,
  loadRuleDetail,
  setVisibilityFilter
} from '../actions';
import {
  IDispatcher,
  ITSLintRule,
  ITSLintRulePanel
} from '../interfaces';

const getVisibleTSLintRules = (rules: ITSLintRule[], filter: string): ITSLintRule[] => {
  if (!rules) {
    return [];
  }
  switch (filter) {
    case FILTER_ALL:
      return rules;
    case FILTER_APPROVED:
      return rules.filter(rule => rule.status === 1);
    case FILTER_MARKED_AS_EXPERIMENTAL:
      return rules.filter(rule => rule.status === 2);
    default:
      return rules.filter(rule => (!filter) ? true : rule.key.indexOf(filter) !== -1);
  }
};

const mapStateToProps = (state: any, ownProps: any) => {
  console.log(state.tsLintRulesVisibilityReducer);
  const visibleTSLintRules = getVisibleTSLintRules(
    state.tsLintRulesReducer,
    state.tsLintRulesVisibilityReducer);
  return {
    panels: state.tsLintRulesPanelReducer as ITSLintRulePanel[],
    rules: visibleTSLintRules
  };
};

const mapDispatchToProps = (dispatch: IDispatcher<any>) => {
  return {
    onFetchRulesFromJSON: (id: string, value?: any) => {
      dispatch(fetchRulesFromJSON(id, value));
    },
    onLoadRuleDetail: (id: string, value?: any) => {
      dispatch(loadRuleDetail(id, value));
    },
    onPanelAdd: (id: string, value?: any) => {
      dispatch(addPanel(id, value));
    },
    onPanelCancel: (id: string, value?: any) => {
      dispatch(cancelPanel(id, value));
    },
    onPanelClose: (id: string, value?: any) => {
      dispatch(closePanel(id, value));
    },
    onPanelOpen: (id: string, value?: any) => {
      dispatch(openPanel(id, value));
    },
    onPanelSubmit: (id: string, value?: any) => {
      dispatch(submitPanel(id, value));
    },
    onRuleFilter: (id: string, filter: string) => {
      console.log(filter);
      dispatch(setVisibilityFilter(id, filter));
    }
  };
};

// tslint:disable-next-line:variable-name
export const VisibleTSLintRules = connect(
  mapStateToProps,
  mapDispatchToProps
)(TSLintRules);
