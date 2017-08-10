import * as React from 'react';
import './MDExpansionPanelContent.css';
import { MDExpansionPanelButtons } from './MDExpansionPanelButtons';

export class MDExpansionPanelContent extends React.Component {
  public readonly props: {
    [key: string]: any;
    isToggled: boolean;
  };

  public render(): JSX.Element| null {
    if (!this.props.isToggled) {
      return null;
    }

    const attrs = {
      tabIndex: -1
    };
    return (
      <div className="MDExpansionContent"
        {...attrs}>
        <MDExpansionPanelButtons />
      </div>
    );
  }
}
