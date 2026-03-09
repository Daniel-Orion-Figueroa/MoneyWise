import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailsTransactionPage } from './details-transaction-page.page';

describe('DetailsTransactionPagePage', () => {
  let component: DetailsTransactionPage;
  let fixture: ComponentFixture<DetailsTransactionPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsTransactionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
