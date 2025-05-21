import { api } from '../ApiServices'

interface CountryName {
  common: string;
  official: string;
}

interface Country {
  name: CountryName;
  flags?: { png: string };
  capital?: string[];
  region: string;
  subregion?: string;
  population: number;
  area?: number;
  tld?: string[];
  nativeName?: string;
  cca3: string;
}

export const fetchUsersData = async (): Promise<Country[]> => {
  return await api.get('/all').then((response: { data: Country[] }) => response.data)
}

export const fetchUserData = async (ccn3: string | undefined): Promise<Country | Country[]> => {
  return await api.get('/alpha/' + ccn3).then((response: { data: Country | Country[] }) => response.data)
}
