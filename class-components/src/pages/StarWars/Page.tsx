import { useEffect, useState } from 'react';
import { Api } from '../../api/api';
import List from './components/List';
import { type Season } from '../../scripts/scripts';
import SearchPanel from './components/SearchPanel';
import useLocalStorage from '../../hooks/useLocalStorage.ts';
type State = {
  seasons: Season[] | null;
  isLoading: boolean;
  error: Error | null;
  search: string;
  filtered: Season[] | null | undefined;
};
function Page() {
  const [state, setState] = useState<State>({
    seasons: null,
    isLoading: true,
    error: null,
    search: '',
    filtered: null,
  });
  const [searchValue, setSearchValue] = useLocalStorage('search', '');
  useEffect(() => {
    const sValue = searchValue;
    if (sValue) setState({ ...state, search: sValue });
    try {
      const api = new Api();
      const response = api.getList();
      if (!response) {
        throw new Error('Failed to fetch user');
      }
      response.then((seasons) => {
        setState({ ...state, seasons, isLoading: false, filtered: seasons });
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        setState({ ...state, isLoading: false, error: error });
      }
    }
  }, []);

  const { seasons, isLoading, error, search, filtered } = state;

  const modelSearch = (searchDef: string) => {
    setState({ ...state, search: searchDef });
    setSearchValue(searchDef);
  };

  const normalizeString = (search: string) => {
    return search.toLowerCase().trim();
  };

  const acceptFilter = () => {
    const searchTerm = normalizeString(search);

    setState({
      ...state,
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

export default Page;
