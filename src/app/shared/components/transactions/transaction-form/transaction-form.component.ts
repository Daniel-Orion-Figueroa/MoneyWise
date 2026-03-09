import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Transaction } from '../../../../core/interfaces/transaction.interface';
import { DEFAULT_CATEGORIES } from '../../../../core/constants/category.constants';
import { TRANSACTION_TYPES, TransactionType } from '../../../../core/constants/transaction-type.constants';
import { SelectOption } from '../../formFields/select-field/select-field.component';

@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.scss'],
  standalone: false
})
export class TransactionFormComponent {

  @Input() transaction: Transaction | null = null;
  @Output() onSave = new EventEmitter<any>();
  @Output() onCancel = new EventEmitter<void>();

  transactionForm!: FormGroup;
  categories = DEFAULT_CATEGORIES;
  TRANSACTION_TYPES = TRANSACTION_TYPES;

  constructor(private fb: FormBuilder) {
    this.initializeForm();
  }

  ngOnInit() {
    if (this.transaction) {
      this.patchFormValues();
    }
  }

  private initializeForm() {
    this.transactionForm = this.fb.group({
      type: [TRANSACTION_TYPES.EXPENSE, Validators.required],
      categoryId: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(0.01)]],
      description: [''],
      date: [new Date().toISOString(), Validators.required],
      photUrl: ['']
    });

    // Escuchar cambios de tipo para filtrar categorías
    this.transactionForm.get('type')?.valueChanges.subscribe(() => {
      // Resetear categoría cuando cambia el tipo
      this.transactionForm.get('categoryId')?.setValue('');
    });
  }

  private patchFormValues() {
    if (this.transaction) {
      this.transactionForm.patchValue({
        type: this.transaction.type,
        categoryId: this.transaction.categoryId,
        amount: this.transaction.amount,
        description: this.transaction.description,
        date: this.transaction.date,
        photUrl: this.transaction.photoUrl || ''
      });
    }
  }

  get filteredCategories() {
    const selectedType = this.transactionForm.get('type')?.value;
    return this.categories.filter(cat => cat.type === selectedType);
  }

  get selectedType(): TransactionType {
    return this.transactionForm.get('type')?.value || TRANSACTION_TYPES.EXPENSE;
  }

  get categoryOptions(): SelectOption[] {
    const type = this.transactionForm.get('type')?.value;
    const filteredCategories = type 
      ? this.categories.filter(cat => cat.type === type)
      : this.categories;
    
    return filteredCategories.map(cat => ({
      value: cat.id,
      label: cat.name
    }));
  }

  onSubmit() {
    if (this.transactionForm.valid) {
      const formData = this.transactionForm.value;
      
      const transactionData = {
        id: this.transaction?.id || this.generateId(),
        userId: this.transaction?.userId || 'current-user',
        ...formData,
        createdAt: this.transaction?.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      this.onSave.emit(transactionData);
    }
  }

  cancel() {
    this.onCancel.emit();
  }

  onPhotoSelected(photoData: string | null) {
    this.transactionForm.get('photUrl')?.setValue(photoData || '');
  }

  onPhotoRemoved() {
    this.transactionForm.get('photUrl')?.setValue('');
  }

  private generateId(): string {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  }

  // Getters para validación en template
  get typeControl() { return this.transactionForm.get('type'); }
  get categoryControl() { return this.transactionForm.get('categoryId'); }
  get amountControl() { return this.transactionForm.get('amount'); }
  get descriptionControl() { return this.transactionForm.get('description'); }
  get dateControl() { return this.transactionForm.get('date'); }

}
