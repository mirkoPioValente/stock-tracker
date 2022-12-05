import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { SentimentData, SentimentResponse } from '../models/sentiment.model';
import { SymbolData } from '../models/symbol.model';
import { SentimentService } from '../services/sentiment.service';

@Component({
  selector: 'app-sentiment',
  templateUrl: './sentiment.component.html',
  styleUrls: ['./sentiment.component.css'],
})
export class SentimentComponent implements OnInit {
  symbolSearched: string;
  symbolData: SymbolData;
  sentimentDatas: SentimentData[];

  constructor(
    private service: SentimentService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((res: Params) => {
      this.symbolSearched = res['symbol'];
      this.getDatas();
    });
  }

  getDatas() {
    this.service
      .getSymbolNames(this.symbolSearched)
      .subscribe((res: SymbolData) => (this.symbolData = res));
    const dateFrom = new Date(new Date().setMonth(new Date().getMonth() - 3));
    this.service
      .getSentimentDatas(
        this.symbolSearched,
        this.formatDate(dateFrom),
        this.formatDate(new Date())
      )
      .subscribe((res: SentimentResponse) => (this.sentimentDatas = res.data));
  }

  formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }
}
