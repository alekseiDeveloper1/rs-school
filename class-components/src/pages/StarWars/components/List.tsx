import type { Season } from '../../../scripts/scripts.ts';

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
        <li key={index}>
          {item.title} | {item.series.title}
        </li>
      ))}
    </ul>
  );
}

export default List;
