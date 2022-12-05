export interface SymbolLookupResponse {
  count: number;
  result: SymbolData[];
}

export interface SymbolData {
  description: string;
  displaySymbol: string;
  symbol: string;
  type: string;
}
