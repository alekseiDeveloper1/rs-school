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

export const normalizeString = (search: string) => {
  return search.toLowerCase().trim();
};
