import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Transaction } from '../../../../core/interfaces/transaction.interface';
import { TRANSACTION_TYPES } from '../../../../core/constants/transaction-type.constants';
import { DEFAULT_CATEGORIES } from '../../../../core/constants/category.constants';
import { SelectOption } from '../../../../shared/components/formFields/select-field/select-field.component';

@Component({
  selector: 'app-form-transaction-modal',
  templateUrl: './form-transaction-modal.component.html',
  styleUrls: ['./form-transaction-modal.component.scss'],
  standalone: false
})
export class FormTransactionModalComponent {
  @Input() transaction?: Transaction;
  @Output() onSaved = new EventEmitter<Transaction>();

  transactionForm: FormGroup;
  categories = DEFAULT_CATEGORIES;
  isEditing = false;
  selectedPhoto: string | null = null;

  constructor(
    private modalCtrl: ModalController,
    private fb: FormBuilder
  ) {
    this.transactionForm = this.fb.group({});
  }

  ngOnInit() {
    this.isEditing = !!this.transaction;
    this.selectedPhoto = this.transaction?.photoUrl || null;
    this.initForm();
    if (this.transaction) {
      this.patchForm();
    }
  }

  get categoryOptions(): SelectOption[] {
    const type = this.transactionForm?.get('type')?.value;
    const filteredCategories = type 
      ? this.categories.filter(cat => cat.type === type)
      : this.categories;
    
    return filteredCategories.map(cat => ({
      value: cat.id,
      label: cat.name
    }));
  }

  initForm() {
    this.transactionForm = this.fb.group({
      type: [this.transaction?.type || TRANSACTION_TYPES.INCOME, Validators.required],
      description: [this.transaction?.description || ''],
      amount: [this.transaction?.amount || '', [Validators.required, Validators.min(0.01)]],
      categoryId: [this.transaction?.categoryId || '', Validators.required],
      date: [this.transaction?.date || new Date().toISOString(), Validators.required]
    });
  }

  patchForm() {
    if (this.transaction) {
      this.transactionForm.patchValue({
        type: this.transaction.type,
        description: this.transaction.description,
        amount: this.transaction.amount.toString(),
        categoryId: this.transaction.categoryId,
        date: this.transaction.date
      });
    }
  }

  onSave() {
    if (this.transactionForm.invalid) {
      return;
    }

    const formData = this.transactionForm.value;
    const transaction: Transaction = {
      id: this.transaction?.id || this.generateId(),
      userId: 'user-1',
      ...formData,
      amount: parseFloat(formData.amount),
      photoUrl: this.selectedPhoto,
      date: new Date(formData.date).toISOString(),
      createdAt: this.transaction?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    this.modalCtrl.dismiss(transaction);
  }

  onPhotoSelected(photo: string | null) {
    this.selectedPhoto = photo;
  }

  close() {
    this.modalCtrl.dismiss();
  }

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }
}
