import type { Season } from '../scripts/scripts.ts';

export class Api {
  getList = async (): Promise<Season[]> => {
    const url = `https://stapi.co/api/v1/rest/season/search`;
    return (await fetch(url).then((res) => res.json())).seasons;
  };
}
