import { KeyValue } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { StockInfo } from '../models/stock.model';
import { SymbolData, SymbolLookupResponse } from '../models/symbol.model';
import { MyStockListService } from '../services/my-stock-list.service';

@Component({
  selector: 'app-my-stock-list',
  templateUrl: './my-stock-list.component.html',
  styleUrls: ['./my-stock-list.component.css'],
})
export class MyStockListComponent implements OnInit {
  @ViewChild('stockInput') stockInput: NgModel;
  stockSymbol: string = ''; // value of the text input
  stockInputOptions: KeyValue<string, string>[] = []; // for autocomplete purpose
  stocksTracked: KeyValue<SymbolData, StockInfo>[] = []; // list of tracked stock
  collectingData: boolean;

  constructor(private service: MyStockListService, private router: Router) {}

  ngOnInit(): void {
    const stockToTrack = JSON.parse(
      localStorage.getItem('stockToTrack') || '[]'
    );
    stockToTrack.length > 0
      ? (this.collectingData = true)
      : (this.collectingData = false);
    this.updateCards(stockToTrack);
  }

  getPossibleNames() {
    this.service
      .getSymbolNames(this.stockSymbol)
      .subscribe((res: SymbolLookupResponse) => {
        this.stockInputOptions = [];
        res.result.forEach((symbol: SymbolData) => {
          if (
            symbol.symbol.length < 6 &&
            symbol.symbol.includes(this.stockSymbol) &&
            !symbol.symbol.includes('.')
          ) {
            this.stockInputOptions.push({
              key: symbol.symbol,
              value: `${symbol.symbol}: ${symbol.description}`,
            });
          }
        });
      });
  }

  trackNewSymbol() {
    const stockToTrack = localStorage.getItem('stockToTrack');
    let stockAlreadyTracked: string[] = [];
    if (stockToTrack) {
      stockAlreadyTracked = JSON.parse(stockToTrack);
    }
    localStorage.setItem(
      'stockToTrack',
      JSON.stringify([...stockAlreadyTracked, this.stockSymbol])
    );
    this.updateCards([this.stockSymbol]);
    this.stockSymbol = '';
  }

  untrackStock(stock: KeyValue<SymbolData, StockInfo>) {
    this.stocksTracked = this.stocksTracked.filter(
      (element: KeyValue<SymbolData, StockInfo>) =>
        element.key.symbol !== stock.key.symbol
    );
    const stockToTrack = localStorage.getItem('stockToTrack');
    let stockAlreadyTracked: string[] = JSON.parse(stockToTrack || '[]');
    stockAlreadyTracked = stockAlreadyTracked.filter(
      (element: string) => element !== stock.key.symbol
    );
    localStorage.setItem('stockToTrack', JSON.stringify(stockAlreadyTracked));
  }

  updateCards(stockToTrack: string[]) {
    stockToTrack.forEach((stock: string) => {
      this.service
        .getAllInfo(stock)
        .subscribe((res: KeyValue<SymbolData, StockInfo>) => {
          this.stocksTracked.push(res);
          this.collectingData = false;
        });
    });
  }

  goToSentiment(symbol: string) {
    this.router.navigate(['/sentiment', symbol]);
  }
}
