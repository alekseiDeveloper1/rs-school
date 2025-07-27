import type { Season } from '../scripts/scripts.ts';

export class Api {
  getList = async (
    countElement: number,
    currentPage: number
  ): Promise<{ seasons: Season[]; totalElements: number }> => {
    const url = `https://stapi.co/api/v1/rest/season/search?pageSize=${countElement}&pageNumber=${currentPage}`;
    const res = await fetch(url).then((res) => res.json());
    return { seasons: res.seasons, totalElements: res.page.totalElements };
  };
}
