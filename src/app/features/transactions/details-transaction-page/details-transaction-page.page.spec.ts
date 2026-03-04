import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailsTransactionPagePage } from './details-transaction-page.page';

describe('DetailsTransactionPagePage', () => {
  let component: DetailsTransactionPagePage;
  let fixture: ComponentFixture<DetailsTransactionPagePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsTransactionPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
