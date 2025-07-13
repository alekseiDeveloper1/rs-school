import { Component } from 'react';
import Input from '../../../UI/Input.tsx';
import Button from '../../../UI/Button.tsx';
import './SearchPanel.css';

class SearchPanel extends Component<{
  modelSearch: (search: string) => void;
  searchValue: string;
  acceptFilter: () => void;
}> {
  render() {
    return (
      <div className="flex">
        <Input
          modelSearch={this.props.modelSearch}
          searchValue={this.props.searchValue}
        />
        <Button acceptFilter={this.props.acceptFilter} />
      </div>
    );
  }
}

export default SearchPanel;
