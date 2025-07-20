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
export class lsService {
  setLS = (key: string, value: string) => {
    localStorage.setItem(key, value);
  };
  getLS = (key: string) => {
    return localStorage.getItem(key);
  };
}
