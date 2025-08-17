import type { Season } from '../../scripts/scripts.ts';
import DashboardItem from './item.tsx';

function List(props: {
  items: Season[] | null | undefined;
  isLoading: boolean;
  error: string | null;
}) {
  if (props.isLoading) {
    return <div>Loading...</div>;
  }
  if (props.error) {
    return <div>Error: {props.error}</div>;
  }
  if (!props.items) {
    return <div>No seasons found</div>;
  }

  return (
    <ul>
      {props.items.map((item: Season, index: number) => (
        <div key={index}>
          <DashboardItem item={item} />
        </div>
      ))}
    </ul>
  );
}

export default List;
