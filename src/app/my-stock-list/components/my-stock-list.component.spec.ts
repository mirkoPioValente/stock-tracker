import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyStockListComponent } from './my-stock-list.component';

describe('MyStockListComponent', () => {
  let component: MyStockListComponent;
  let fixture: ComponentFixture<MyStockListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyStockListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyStockListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
