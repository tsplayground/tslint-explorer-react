import * as React from 'react';
import { LinearProgress } from 'material-ui';
import { VisibleTSLintRules } from '../../containers';
import { IProcess } from '../../interfaces';
import './AppContent.css';
export class AppContent extends React.Component {
  public props: {
    [key: string]: any;
    process: IProcess[];
  };

  public states: {
    [key: string]: any;
  };

  public render(): JSX.Element {
    const progressBar = (this.props.process.length) ? <LinearProgress/> : null;
    return (
      <div className="App">
        {progressBar}
        <h1 className="mat-headline app-title">
          Tslint Explorer
        </h1>
        <VisibleTSLintRules {...this.props}/>
      </div>
    );
  }
}
