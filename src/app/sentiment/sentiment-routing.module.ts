import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SentimentComponent } from './components/sentiment.component';

const routes: Routes = [
  {
    path: ':symbol',
    component: SentimentComponent,
  },
  {
    path: '**',
    redirectTo: '/',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SentimentRoutingModule {}
