import * as React from 'react';
import {
  AppBar,
  Drawer,
  LinearProgress,
  MenuItem
} from 'material-ui';
import { VisibleTSLintRules } from '../../containers';
import { IProcess } from '../../interfaces';
import './AppContent.css';
import {
  BrowserRouter as AppRouter,
  Link,
  Route,
  Switch
} from 'react-router-dom';
import { HomePage } from './HomePage';
export class AppContent extends React.Component {
  public props: {
    [key: string]: any;
    process: IProcess[];
  };
  public state: {
    [key: string]: any;
    menuOpen: boolean
  };

  public menuOpen(): void {
    this.setState({
      menuOpen: true
    });
  }

  public menuClose(): void {
    this.setState({
      menuOpen: false
    });
  }

  public menuToggle(): void {
    !this.state || !this.state.menuOpen ? this.menuOpen() : this.menuClose();
  }

  public render(): JSX.Element {
    const progressBarStyles: React.CSSProperties = {
      position: 'fixed',
      top: 0
    };
    const progressBar = (this.props.process.length) ?
      <LinearProgress style={progressBarStyles} /> :
      null;

    const menuStateChange = (menuOpen: boolean) => this.setState({ menuOpen });

    return (
      <AppRouter>
        <div className="App">
          {progressBar}
          <AppBar className="AppHeader"
            title="Tslint Explorer"
            onLeftIconButtonTouchTap={this.menuToggle} />
          <Drawer open={this.state ? this.state.menuOpen : false}
            docked={false}
            onRequestChange={menuStateChange}>
            <Link to="/">
              <MenuItem onClick={this.menuClose}>
                Home
              </MenuItem>
            </Link>
            <Link to="/rules">
              <MenuItem onClick={this.menuClose}>
                Rules
              </MenuItem>
            </Link>
          </Drawer>
          <div className="AppContent">
            <Switch>
              <Route exact={true} path="/"
                component={HomePage} />
              <Route path="/rules"
                component={VisibleTSLintRules} />
            </Switch>
          </div>
        </div>
      </AppRouter >
    );
  }
}
