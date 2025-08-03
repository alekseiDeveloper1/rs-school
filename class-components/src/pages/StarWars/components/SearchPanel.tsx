import Input from '../../../UI/Input';
import Button from '../../../UI/Button';
import './SearchPanel.css';

function SearchPanel(props: {
  modelSearch: (search: string) => void;
  searchValue: string;
  acceptFilter: () => void;
}) {
  return (
    <div className="flex">
      <Input modelSearch={props.modelSearch} searchValue={props.searchValue} />
      <Button acceptFilter={props.acceptFilter} />
    </div>
  );
}

export default SearchPanel;
