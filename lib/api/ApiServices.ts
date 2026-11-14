import { Country } from '@/lib/types/country'

// REST Countries v5 (v1 à v4 ont été supprimées). Une clé API est obligatoire :
// https://restcountries.com/docs/countries/legacy-api-deprecation
// Ce module ne doit être utilisé que côté serveur pour ne pas exposer la clé.
const BASE_URL = 'https://api.restcountries.com/countries/v5'
const REVALIDATE_SECONDS = 60 * 60 * 24
const PAGE_SIZE = 100 // limite max du plan gratuit

interface V5Country {
  names: {
    common: string;
    official: string;
    native?: Record<string, { common: string; official: string }>;
  };
  codes: { alpha_3: string };
  flag?: { url_png?: string; url_svg?: string };
  capitals?: { name: string }[];
  region?: string;
  subregion?: string;
  population: number;
  area?: { kilometers: number };
  tlds?: string[];
}

interface V5Response {
  data: {
    objects: V5Country[];
    meta: { total: number; more?: boolean };
  };
}

const LIST_FIELDS = 'names.common,names.official,codes.alpha_3,flag.url_png,capitals,region,population'

const v5Get = async (path: string): Promise<V5Response> => {
  const apiKey = process.env.REST_COUNTRIES_API_KEY
  if (!apiKey) {
    throw new Error('REST_COUNTRIES_API_KEY is not set')
  }

  const response = await fetch(BASE_URL + path, {
    headers: { accept: 'application/json', Authorization: `Bearer ${apiKey}` },
    next: { revalidate: REVALIDATE_SECONDS }
  })
  if (!response.ok) {
    throw new Error(`REST Countries ${response.status}: ${await response.text()}`)
  }
  return response.json()
}

const toCountry = (c: V5Country): Country => ({
  name: { common: c.names.common, official: c.names.official },
  flags: c.flag?.url_png ? { png: c.flag.url_png } : undefined,
  capital: c.capitals?.map((capital) => capital.name),
  region: c.region,
  subregion: c.subregion,
  population: c.population,
  area: c.area?.kilometers,
  tld: c.tlds,
  cca3: c.codes.alpha_3,
  nativeName: c.names.native ? Object.values(c.names.native)[0]?.common : undefined
})

export const getAllCountries = async (): Promise<Country[]> => {
  const countries: Country[] = []
  let offset = 0
  let more = true

  while (more) {
    const { data } = await v5Get(`?limit=${PAGE_SIZE}&offset=${offset}&response_fields=${LIST_FIELDS}`)
    // Certains territoires (ex. Abkhazie) n'ont pas de code alpha_3 : sans code, pas de page détail
    countries.push(...data.objects.filter((c) => c.codes.alpha_3).map(toCountry))
    offset += PAGE_SIZE
    more = data.meta.more ?? offset < data.meta.total
  }
  return countries
}

export const getCountryByCode = async (cca3: string): Promise<Country | undefined> => {
  const { data } = await v5Get(`/codes.alpha_3/${encodeURIComponent(cca3)}`)
  return data.objects[0] ? toCountry(data.objects[0]) : undefined
}
