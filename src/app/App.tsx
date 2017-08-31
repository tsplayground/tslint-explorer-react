import * as React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { appReducer } from './reducers';
import {
  applyMiddleware,
  createStore
} from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { AppContainer } from './containers';
import { processManager } from './middlewares';
const store = createStore(
  appReducer,
  applyMiddleware(processManager),
  applyMiddleware(thunk));

export class App extends React.Component {
  public render(): JSX.Element {
    return (
      <MuiThemeProvider>
      <Provider store={store}>
        <BrowserRouter>
          <AppContainer {...this.props}/>
        </BrowserRouter>
      </Provider>
      </MuiThemeProvider>
    );
  }
}
