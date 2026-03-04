import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListaTransactionPagePage } from './lista-transaction-page.page';

describe('ListaTransactionPagePage', () => {
  let component: ListaTransactionPagePage;
  let fixture: ComponentFixture<ListaTransactionPagePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaTransactionPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
