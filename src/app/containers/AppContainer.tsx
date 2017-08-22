import { connect } from 'react-redux';
import { AppContent } from '../components';
import {
  startProcess,
  stopProcess
} from '../actions';
import { IProcess } from '../interfaces';

const mapStateToProps = (state: any, ownProps: any) => {
  return {
    process: state.appProcessReducer
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onAppStartProcess: (id: string, value?: any) => {
      dispatch(startProcess(id, value));
    },
    onAppStopProcess: (id: string, value: IProcess) => {
      dispatch(stopProcess(id, value));
    }
  };
};

// tslint:disable-next-line:variable-name
export const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AppContent);
