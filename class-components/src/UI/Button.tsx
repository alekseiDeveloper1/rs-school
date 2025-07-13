import { Component } from 'react';

class Button extends Component<{ acceptFilter: () => void }> {
  render() {
    return <button onClick={this.props.acceptFilter}>Search</button>;
  }
}

export default Button;
