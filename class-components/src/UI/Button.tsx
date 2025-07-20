import React from 'react';

class Button extends React.Component<{ acceptFilter: () => void }> {
  render() {
    return <button onClick={this.props.acceptFilter}>Search</button>;
  }
}

export default Button;
