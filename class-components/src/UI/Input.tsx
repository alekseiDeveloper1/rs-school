import { Component } from 'react';

class Input extends Component<{
  modelSearch: (search: string) => void;
  searchValue: string;
}> {
  render() {
    return (
      <input
        className={'mr-10'}
        onChange={(event) => this.props.modelSearch(event.currentTarget.value)}
        value={this.props.searchValue}
      />
    );
  }
}

export default Input;
