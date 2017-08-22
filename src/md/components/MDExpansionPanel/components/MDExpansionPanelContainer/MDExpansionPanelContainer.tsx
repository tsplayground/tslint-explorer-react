import * as React from 'react';
import './MDExpansionPanelContainer.css';
import { MDExpansionPanel } from '../MDExpansionPanel';

export class MDExpansionPanelContainer extends React.Component<{}, {}> {
  public states: {
    [key: string]: any
  };

  public selectedPanel: MDExpansionPanel | undefined;

  public render(): JSX.Element {
    const children = React.Children.map(this.props.children,
      (child: any) => React.cloneElement(child, {
        container: this
      }));

    return (
      <div className="MDExpansionPanelContainer">
        {children}
      </div>
    );
  }
}
