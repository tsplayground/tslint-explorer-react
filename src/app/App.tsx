import * as React from 'react';
import './App.css';
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
      <Provider store={store}>
        <AppContainer/>
      </Provider>
    );
  }
}
