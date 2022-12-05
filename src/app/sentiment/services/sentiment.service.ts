import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, switchMap } from 'rxjs';
import { SentimentResponse } from '../models/sentiment.model';
import { SymbolData, SymbolLookupResponse } from '../models/symbol.model';

@Injectable()
export class SentimentService {
  finnhubURL = 'https://finnhub.io/api/v1/';
  finnhubAPIKeyTokenString = '&token=bu4f8kn48v6uehqi3cqg';
  symbolData:
    | import('c:/Users/mivalente/OneDrive - Engineering Ingegneria Informatica S.p.A/Desktop/Projects/angular/stockTracker/stock-tracker/src/app/sentiment/models/symbol.model').SymbolData
    | undefined;

  constructor(private http: HttpClient) {}

  getSymbolNames(symbol: string): Observable<SymbolData> {
    return this.http
      .get<SymbolLookupResponse>(
        `${this.finnhubURL}search?q=${symbol}${this.finnhubAPIKeyTokenString}`
      )
      .pipe(
        switchMap((symbolRes: SymbolLookupResponse) => {
          let realSymbol: SymbolData = symbolRes.result.find(
            (element: SymbolData) => element.symbol === symbol
          ) || { description: '', displaySymbol: '', symbol: symbol, type: '' };
          return of(realSymbol);
        })
      );
  }

  getSentimentDatas(
    symbol: string,
    dateFrom: string,
    dateTo: string
  ): Observable<SentimentResponse> {
    return this.http.get<SentimentResponse>(
      `${this.finnhubURL}/stock/insider-sentiment?symbol=${symbol}&from=${dateFrom}&to=${dateTo}${this.finnhubAPIKeyTokenString}`
    );
  }
}
