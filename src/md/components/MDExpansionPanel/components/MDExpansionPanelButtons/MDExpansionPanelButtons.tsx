import * as React from 'react';
import './MDExpansionPanelButtons.css';

export class MDExpansionPanelButtons extends React.Component {
  public readonly props: {
    [key: string]: any;
  };

  public render(): JSX.Element| null {
    return (
      <div className="MDExpansionPanelButtons">
        {this.props.children}
      </div>
    );
  }
}
