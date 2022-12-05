import { KeyValue } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable, of, switchMap } from 'rxjs';
import { StockInfo } from '../models/stock.model';
import { SymbolData, SymbolLookupResponse } from '../models/symbol.model';

@Injectable()
export class MyStockListService {
  finnhubURL = 'https://finnhub.io/api/v1/';
  finnhubAPIKeyTokenString = '&token=bu4f8kn48v6uehqi3cqg';

  constructor(private http: HttpClient) {}

  getAllInfo(symbol: string): Observable<KeyValue<SymbolData, StockInfo>> {
    return forkJoin([this.getSymbolNames(symbol), this.getQuote(symbol)]).pipe(
      switchMap(([stock, info]: [SymbolLookupResponse, StockInfo]) => {
        let realSymbol: SymbolData = stock.result.find(
          (element: SymbolData) => element.symbol === symbol
        ) || { description: '', displaySymbol: '', symbol: symbol, type: '' };
        return of({ key: realSymbol, value: info });
      })
    );
  }

  getQuote(symbol: string): Observable<StockInfo> {
    return this.http.get<StockInfo>(
      `${this.finnhubURL}quote?symbol=${symbol}${this.finnhubAPIKeyTokenString}`
    );
  }

  getSymbolNames(symbol: string): Observable<SymbolLookupResponse> {
    return this.http.get<SymbolLookupResponse>(
      `${this.finnhubURL}search?q=${symbol}${this.finnhubAPIKeyTokenString}`
    );
  }
}
