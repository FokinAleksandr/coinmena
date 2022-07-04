export type TotalSummaryType = {
  Date: string;
  Global: {
    Date: string;
    NewConfirmed: number;
    NewDeaths: number;
    NewRecovered: number;
    TotalConfirmed: number;
    TotalDeaths: number;
    TotalRecovered: number;
  };
  Countries: {
    Country: string;
    CountryCode: string;
    Date: string;
    ID: string;
    NewConfirmed: number;
    NewDeaths: number;
    NewRecovered: number;
    Premium: {};
    Slug: string;
    TotalConfirmed: number;
    TotalDeaths: number;
    TotalRecovered: number;
  }[];
  ID: string;
  Message: string;
};
