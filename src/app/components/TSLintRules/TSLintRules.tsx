import * as React from 'react';
import './TSLintRules.css';
import {
  MDExpansionPanel,
  MDExpansionPanelContainer
} from '../../../md';
import {
  ITSLintRule,
  ITSLintRulePanel
} from '../../interfaces';
import { TextField } from 'material-ui';
import { v4 as uuidV4 } from 'uuid';
export class TSLintRules extends React.Component {
  public props: {
    [key: string]: any,
    rules: ITSLintRule[],
    panels: ITSLintRulePanel[]
    configs?: any
  };

  public state: {
    [key: string]: any;
    keywords: string;
    id: string;
  };

  constructor(props: any) {
    super(props);
    if (!this.state) {
      this.state = {
        id: uuidV4(),
        keywords: '',
        rules: []
      };
    } else {
      if (!this.state.keywords) {
        this.state.keywords = '';
      }

      if (!this.state.id) {
        this.state.id = uuidV4();
      }
    }
    this.filterRule = this.filterRule.bind(this);
    this.keywordsChange = this.keywordsChange.bind(this);
    // this.filterRule = ::this.filterRule; // bind operator
    // this.keywordsChange = ::this.keywordsChange; // bind operator
  }

  public filterRule(e: React.KeyboardEvent<any>): void {
    if (!e.key) {
      // alert error
      return;
    }
    if (e.key.length !== 1 && !/^(Backspace|Delete)$/.test(e.key)) {
      // alert error
      return;
    } else if (!/[a-z-]/.test(e.key)) {
      // alert error
      return;
    }
    this.props.onRuleFilter(this.state.id, this.state.keywords);
  }

  public keywordsChange(e: React.FormEvent<string>): void {
    this.setState({
      keywords: (e.target as HTMLInputElement).value
    });
  }

  public render(): JSX.Element {
    const panels = this.props.rules.map(rule => {
      const refReceiver = (ref: HTMLIFrameElement) => {
          ref && !ref.src &&
          rule.isToggled &&
          this.props.onLoadRuleDetail(rule.id, {iframe: ref, url: rule.url });
      };
      const iframe = (<iframe className="tslint-embed" ref={refReceiver}/>);
      return (
        <MDExpansionPanel {...this.props}
                          key={rule.key}
                          id={rule.key}
                          title={rule.key}
                          description={rule.value}
                          isToggled={rule.isToggled}
                          isSubmitted={rule.isSubmitted}>
          {iframe}
        </MDExpansionPanel>
      );
    });
    return (
      <div>
        <TextField className="full-width mat-title search-box"
                  onKeyUp={this.filterRule}
                  onChange={this.keywordsChange}
                  value={this.state.keywords}
                  fullWidth={true}/>
        <MDExpansionPanelContainer>
          {panels}
        </MDExpansionPanelContainer>
      </div>
    );
  }

  public componentDidMount(): void {
    this.props.onFetchRulesFromJSON();
  }
}
