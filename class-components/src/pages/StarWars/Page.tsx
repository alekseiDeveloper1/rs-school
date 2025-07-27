import { useEffect, useState } from 'react';
import { Api } from '../../api/api';
import List from './components/List';
import { type Season } from '../../scripts/scripts';
import SearchPanel from './components/SearchPanel';
import useLocalStorage from '../../hooks/useLocalStorage.ts';
import Header from '../../layout/Page';
import { Pagination } from './components/Pagination.tsx';
import { useLocation } from 'react-router-dom';
type State = {
  seasons: Season[] | null;
  isLoading: boolean;
  error: Error | null;
  search: string;
  filtered: Season[] | null | undefined;
  totalCount: number;
};
const ITEMS_PER_PAGE = 10;
export default function Page() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const currentPage = Number(searchParams.get('page')) || 1;
  const [state, setState] = useState<State>({
    seasons: null,
    isLoading: true,
    error: null,
    search: '',
    filtered: null,
    totalCount: 50,
  });
  const fetchSeasons = async () => {
    try {
      const api = new Api();
      const res: { seasons: Season[]; totalElements: number } =
        await api.getList(ITEMS_PER_PAGE, currentPage);
      if (!res) {
        throw new Error('Failed to fetch user');
      }
      const seasons = res.seasons;
      const totalElements = res.totalElements;
      setState({
        ...state,
        seasons,
        isLoading: false,
        filtered: seasons,
        totalCount: totalElements,
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        setState({ ...state, isLoading: false, error: error });
      }
    }
  };
  const [searchValue, setSearchValue] = useLocalStorage('search', '');
  useEffect(() => {
    const sValue = searchValue;
    if (sValue) setState({ ...state, search: sValue });
    fetchSeasons();
  }, [location]);

  const { seasons, isLoading, error, search, filtered, totalCount } = state;

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
      <Header />
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
      <Pagination
        totalItems={totalCount}
        itemsPerPage={ITEMS_PER_PAGE}
        currentPage={currentPage}
      />
    </>
  );
}
