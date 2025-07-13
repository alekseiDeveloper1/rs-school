import { Component } from 'react';
import type { Season } from '../../../scripts/scripts.ts';

class List extends Component<{
  items: Season[] | null;
  isLoading: boolean;
  error: string | null;
}> {
  render() {
    if (this.props.isLoading) {
      return <div>Loading...</div>;
    }
    if (this.props.error) {
      return <div>Error: {this.props.error}</div>;
    }
    if (!this.props.items) {
      return <div>No seasons found</div>;
    }

    return (
      <ul>
        {this.props.items.map((item: Season, index: number) => (
          <li key={index}>
            {item.title} | {item.series.title}
          </li>
        ))}
      </ul>
    );
  }
}

export default List;
