import * as React from 'react';
import './MDExpansionPanel.css';
import { MDExpansionPanelContainer } from './MDExpansionPanelContainer';
import { MDExpansionHeader } from './MDExpansionPanelHeader';
import { MDExpansionPanelContent } from './MDExpansionPanelContent';

export class MDExpansionPanel extends React.Component<{}, {}> {
  public states: {
    [key: string]: any,
    isToggled: boolean
  };

  public props: {
    [key: string]: any,
    container?: MDExpansionPanelContainer
  };

  constructor(props: {
    [key: string]: any
  }) {
    super(props);
    this.states = {
      isToggled: false
    };
    // This binding is necessary to make `this` work in the callback
    this.toggle = this.toggle.bind(this);
  }

  public submit(): void {
    this.unselect();
    // this.onSubmit.emit();
  }

  public cancel(): void {
    this.unselect();
    // this.onCancel.emit();
  }

  public select(): void {
    if (!this.props.container) {
      return;
    }
    this.props.container.selectedPanel = this;
    // this.onOpen.emit(this);
  }

  public unselect(): void {
    if (!this.props.container) {
      return;
    }
    this.props.container.selectedPanel = undefined;
    // this.onClose.emit(this);
  }

  public toggle(): void {
    (this.states.isToggled) ? this.unselect() : this.select();
  }

  public render(): JSX.Element {
    return (
      <div className={`MDExpansionPanel ${this.states.isToggled ? 'is-toggled' : ''}`}>
        <MDExpansionHeader isToggled={this.states.isToggled}
                           toggle={this.toggle}
                           description={''}
                           toggledDescription={''}
                           {...this.props} />
        <MDExpansionPanelContent isToggled={this.states.isToggled}
                                 {...this.props} />
      </div>
    );
  }
}
