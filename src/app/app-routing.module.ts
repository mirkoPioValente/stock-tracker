import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./my-stock-list/my-stock-list.module').then(
        (m) => m.MyStockListModule
      ),
  },
  {
    path: 'sentiment',
    loadChildren: () =>
      import('./sentiment/sentiment.module').then((m) => m.SentimentModule),
  },
  {
    path: '**',
    loadChildren: () =>
      import('./my-stock-list/my-stock-list.module').then(
        (m) => m.MyStockListModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
