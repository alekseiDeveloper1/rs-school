import { useState } from 'react';
import List from './components/List';
import { normalizeString, type Season } from '../../scripts/scripts';
import SearchPanel from './components/SearchPanel';
import Header from '../../layout/Page';
import { Pagination } from './components/Pagination.tsx';
import { useLocation } from 'react-router-dom';
import { useGetSeasonsQuery } from '../../api/api.ts';
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
  const { data, isLoading } = useGetSeasonsQuery({
    countElement: ITEMS_PER_PAGE,
    currentPage: currentPage,
  });
  const [state, setState] = useState<State>({
    seasons: null,
    isLoading: true,
    error: null,
    search: '',
    filtered: null,
    totalCount: 50,
  });

  const { seasons, search, totalCount } = state;

  const modelSearch = (searchDef: string) => {
    setState({ ...state, search: searchDef });
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
      <List items={data?.seasons} isLoading={isLoading} error={null} />
      <Pagination
        totalItems={totalCount}
        itemsPerPage={ITEMS_PER_PAGE}
        currentPage={currentPage}
      />
    </>
  );
}
