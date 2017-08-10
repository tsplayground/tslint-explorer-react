import * as React from 'react';
import './MDExpansionPanelHeader.css';

export class MDExpansionHeader extends React.Component {
  public readonly props: {
    [key: string]: any;
    isToggled: boolean;
    description: JSX.Element | string;
    toggledDescription: JSX.Element | string;
    toggle(): void;
  };

  public states: {
    [key: string]: any
  };

  constructor(props: {
    [key: string]: any
  }) {
    super(props);
  }

  public enter(e: any): void {
    e.preventDefault();
    if (e.key !== 'Enter') {
      return;
    }
    this.props.toggle();
  }

  public render(): JSX.Element {
    const attrs = {
      tabIndex: 0
    };
    const title = (this.props.children) ? (
      <div className="MDExpansionPanelHeader-title layout-column">
        {this.props.children}
      </div>
    ) : undefined;
    return (
      // tslint:disable-next-line:max-line-length
      <div className={`MDExpansionPanelHeader layout-row ${this.props.isToggled ? 'is-toggled' : ''}`}
        {...attrs}
        onKeyUp={this.enter}
        onClick={this.props.toggle}>
        {title}
        <div className="MDExpansionPanelHeader-description layout-column">
          {!this.props.isToggled ? this.props.description : this.props.toggledDescription}
        </div>
        <div className="MDExpansionPanelHeader-arrow-down layout-column">
          <svg fill="#000000"
               height="24"
               viewBox="0 0 24 24"
               width="24"
               xmlns="http://www.w3.org/2000/svg">
            <path d="M7.41 7.84L12 12.42l4.59-4.58L18 9.25l-6 6-6-6z"/>
            <path d="M0-.75h24v24H0z" fill="none"/>
          </svg>
        </div>
      </div>
    );
  }
}
