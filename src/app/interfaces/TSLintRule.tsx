import { IProcess } from './Process';
import { ITSLintRulePanel } from './TSLintRulePanel';
export interface ITSLintRule extends ITSLintRulePanel {
  key: string;
  url: string;
  plugin: string;
  value: string;
  process?: IProcess;
  status?: number;
}
