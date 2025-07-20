import React from 'react';
import { Api } from '../../api/api';
import List from './components/List';
import { lsService, type Season } from '../../scripts/scripts';
import SearchPanel from './components/SearchPanel';
type State = {
  seasons: Season[] | null;
  isLoading: boolean;
  error: Error | null;
  search: string;
  filtered: Season[] | null;
};
class Page extends React.Component {
  state: State = {
    seasons: null,
    isLoading: true,
    error: null,
    search: '',
    filtered: null,
  };
  ls = new lsService();
  async componentDidMount() {
    const sValue = this.ls.getLS('search');
    if (sValue) this.setState({ search: sValue });
    try {
      const api = new Api();
      const response = await api.getList();
      if (!response) {
        throw new Error('Failed to fetch user');
      }
      const seasons = response;
      this.setState({ seasons, isLoading: false, filtered: seasons });
    } catch (error) {
      this.setState({ isLoading: false, error: error });
    }
  }

  render() {
    const { seasons, isLoading, error, search, filtered } = this.state;

    const modelSearch = (searchDef: string) => {
      this.setState({ search: searchDef });
      this.ls.setLS('search', searchDef);
    };

    const normalizeString = (search: string) => {
      return search.toLowerCase().trim();
    };

    const acceptFilter = () => {
      const searchTerm = normalizeString(search);

      this.setState({
        filtered: seasons?.filter((season: Season) => {
          const titleMatch = normalizeString(season.title).includes(searchTerm);
          const seriesMatch = normalizeString(season.series.title).includes(
            searchTerm
          );

          return titleMatch || seriesMatch;
        }),
      });
    };
    return (
      <>
        <SearchPanel
          modelSearch={modelSearch}
          searchValue={search}
          acceptFilter={acceptFilter}
        />
        <List
          items={filtered}
          isLoading={isLoading}
          error={error?.message ?? null}
        />
      </>
    );
  }
}

export default Page;
