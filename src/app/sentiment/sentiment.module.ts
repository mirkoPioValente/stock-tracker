import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SentimentComponent } from './components/sentiment.component';
import { SentimentRoutingModule } from './sentiment-routing.module';
import { SentimentService } from './services/sentiment.service';
import { HttpClientModule } from '@angular/common/http';
import { MonthPipe } from './pipes/month.pipe';

@NgModule({
  declarations: [SentimentComponent, MonthPipe],
  imports: [CommonModule, SentimentRoutingModule, HttpClientModule],
  providers: [SentimentService],
})
export class SentimentModule {}
