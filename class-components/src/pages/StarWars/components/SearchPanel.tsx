import React from 'react';
import Input from '../../../UI/Input';
import Button from '../../../UI/Button';
import './SearchPanel.css';

class SearchPanel extends React.Component<{
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
