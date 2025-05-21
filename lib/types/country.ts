export interface Country {
  name: {
    common: string;
    official: string;
  };
  flags?: {
    png: string;
  };
  capital?: string[];
  region?: string;
  subregion?: string;
  population: number;
  borders?: string[];
  languages?: Record<string, string>;
  currencies?: Record<string, {
    name: string;
    symbol: string;
  }>;
  area?: number;
  tld?: string[];
  independent?: boolean;
  unMember?: boolean;
  cca3: string;
  nativeName?: string;
} 