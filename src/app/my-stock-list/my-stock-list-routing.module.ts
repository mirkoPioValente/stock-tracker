import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyStockListComponent } from './components/my-stock-list.component';

const routes: Routes = [
  {
    path: '',
    component: MyStockListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyStockListRoutingModule {}
