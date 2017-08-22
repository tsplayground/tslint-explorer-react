import * as React from 'react';

import './MDExpansionPanel.css';
import { MDExpansionHeader } from '../MDExpansionPanelHeader';
import { MDExpansionPanelContent } from '../MDExpansionPanelContent';

export class MDExpansionPanel extends React.Component<{}, {}> {
  public states: {
    [key: string]: any,
    isToggled: boolean,
    iSubmitted: boolean
  };

  public props: {
    [key: string]: any,
    id: string,
    title: string,
    description: string
  };

  constructor(props: {
    [key: string]: any
  }) {
    super(props);
    // This binding is necessary to make `this` work in the callback
    this.toggle = this.toggle.bind(this);
  }

  public componentDidMount(): void {
    // this.props.onPanelAdd(this.props.id, this.props);
  }

  public submit(): void {
    this.unselect();
    this.props.onPanelSubmit(this.props.id);
  }

  public cancel(): void {
    this.unselect();
    this.props.onPanelCancel(this.props.id);
  }

  public select(): void {
    this.props.onPanelOpen(this.props.id);
  }

  public unselect(): void {
    this.props.onPanelClose(this.props.id);
  }

  public toggle(): void {
    (this.props.isToggled) ? this.unselect() : this.select();
  }

  public render(): JSX.Element {
    return (
      <div className={`MDExpansionPanel ${this.props.isToggled ? 'is-toggled' : ''}`}>
        <MDExpansionHeader isToggled={this.props.isToggled}
                           toggle={this.toggle}
                           description={this.props.description}
                           toggledDescription={this.props.description}>
          {this.props.title}
        </MDExpansionHeader>
        <MDExpansionPanelContent isToggled={this.props.isToggled}
                                 isSubmitted={this.props.iSubmitted}>
          {this.props.children}
        </MDExpansionPanelContent>
      </div>
    );
  }
}
