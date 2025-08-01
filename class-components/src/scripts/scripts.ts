import { Api } from '../api/api.ts';

export type Season = {
  numberOfEpisodes: number;
  seasonNumber: number;
  series: {
    title: string;
    uid: string;
  };
  title: string;
  uid: string;
};

export const callApi = async (ITEMS_PER_PAGE: number, currentPage: number) => {
  try {
    const api = new Api();
    const res: { seasons: Season[]; totalElements: number } = await api.getList(
      ITEMS_PER_PAGE,
      currentPage
    );
    if (!res) {
      throw new Error('Failed to fetch user');
    }
    const seasonsRes = res.seasons;
    const totalElements = res.totalElements;
    return { seasonsRes, totalElements, error: null };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { seasonsRes: null, totalElements: -1, error };
    }
  }
  return { seasonsRes: null, totalElements: -1, error: null };
};

export const normalizeString = (search: string) => {
  return search.toLowerCase().trim();
};
