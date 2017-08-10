import * as React from 'react';
import {
  MDExpansionPanel,
  MDExpansionPanelContainer
} from '../md';
import './App.css';

const logo = require('./logo.svg');

export class App extends React.Component<{}, {}> {
  public render(): JSX.Element {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        <MDExpansionPanelContainer>
          <MDExpansionPanel/>
        </MDExpansionPanelContainer>
      </div>
    );
  }
}
