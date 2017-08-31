import * as React from 'react';
export class HomePage extends React.Component {
  public props: {
    [key: string]: any
  };

  public render(): JSX.Element {
    return (
      <div>
        Welcome to TSLint rules
      </div>
    );
  }
}
