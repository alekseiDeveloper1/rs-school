import { useDispatch, useSelector } from 'react-redux';
import { addItem, removeItem } from './selectedItemsSlice';
import type { RootState } from '../../../app/store.ts';
import type { Season } from '../../../scripts/scripts.ts';
import useLocalStorage from '../../../hooks/useLocalStorage.ts';

const DashboardItem = (props: { item: Season }) => {
  const dispatch = useDispatch();
  const [selectedItemsStor, setselectedItemsStor] = useLocalStorage<string[]>(
    'items',
    []
  );

  const selectedItems = useSelector((state: RootState) =>
    state.selectedItems.selectedItems.length > 0
      ? state.selectedItems.selectedItems
      : selectedItemsStor
  );
  const isSelected = selectedItems.includes(props.item.uid);

  const handleCheckboxChange = () => {
    if (isSelected) {
      dispatch(removeItem(props.item.uid));
      setselectedItemsStor(
        selectedItems.filter((item) => item !== props.item.uid)
      );
    } else {
      dispatch(addItem(props.item.uid));
      setselectedItemsStor([...selectedItems, props.item.uid]);
    }
  };

  return (
    <>
      <input
        type="checkbox"
        checked={isSelected}
        onChange={handleCheckboxChange}
      />
      <li>
        {props.item.title} | {props.item.series.title}
      </li>
    </>
  );
};

export default DashboardItem;
