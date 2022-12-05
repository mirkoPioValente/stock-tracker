import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MyStockListComponent } from './components/my-stock-list.component';
import { MyStockListRoutingModule } from './my-stock-list-routing.module';
import { CutWordsPipe } from './pipes/cut-words.pipe';
import { MyStockListService } from './services/my-stock-list.service';

@NgModule({
  declarations: [MyStockListComponent, CutWordsPipe],
  imports: [
    MyStockListRoutingModule,
    FormsModule,
    CommonModule,
    HttpClientModule,
  ],
  providers: [MyStockListService],
})
export class MyStockListModule {}
