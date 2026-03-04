import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { DashboardCardComponent } from './components/dashboard/dashboard-card/dashboard-card.component';
import { AmountDisplayComponent } from './components/amount/amount-display/amount-display.component';
import { CategoryBadgeComponent } from './components/catergories/category-badge/category-badge.component';
import { CategoryIconComponent } from './components/catergories/category-icon/category-icon.component';
import { ProgressBarCategoryComponent } from './components/dashboard/progress-bar-category/progress-bar-category.component';
import { FilterBarComponent } from './components/filters/filter-bar/filter-bar.component';
import { DateFieldComponent } from './components/formFields/date-field/date-field.component';
import { InputFieldComponent } from './components/formFields/input-field/input-field.component';
import { SelectFieldComponent } from './components/formFields/select-field/select-field.component';
import { PhotoGalleryModalComponent } from './components/photo/photo-gallery-modal/photo-gallery-modal.component';
import { PhotoPreviewComponent } from './components/photo/photo-preview/photo-preview.component';
import { PhotoSelectorComponent } from './components/photo/photo-selector/photo-selector.component';
import { EmptyStateComponent } from './components/states/empty-state/empty-state.component';
import { TransactionDetailsComponent } from './components/transactions/transaction-details/transaction-details.component';
import { TransactionFormComponent } from './components/transactions/transaction-form/transaction-form.component';
import { TransactionItemComponent } from './components/transactions/transaction-item/transaction-item.component';
import { CurrencyFormatPipe } from './pipes/currency-format-pipe';
import { DateFormatPipe } from './pipes/date-format-pipe';
import { FilterByTypePipe } from './pipes/filter-by-type-pipe';
import { FilterByCategoryPipe } from './pipes/filter-by-category-pipe';
import { SearchByTextPipe } from './pipes/search-by-text-pipe';
import { MonthNamePipe } from './pipes/month-name-pipe';
import { CategoryIconPipe } from './pipes/category-icon-pipe';
import { CategoryColorPipe } from './pipes/category-color-pipe';



@NgModule({
  declarations: [
    AmountDisplayComponent,
    CategoryBadgeComponent,
    CategoryIconComponent,
    DashboardCardComponent,
    ProgressBarCategoryComponent,
    FilterBarComponent,
    DateFieldComponent,
    InputFieldComponent,
    SelectFieldComponent,
    PhotoGalleryModalComponent,
    PhotoPreviewComponent,
    PhotoSelectorComponent,
    EmptyStateComponent,
    TransactionDetailsComponent,
    TransactionFormComponent,
    TransactionItemComponent,
    CurrencyFormatPipe,
    DateFormatPipe,
    FilterByTypePipe,
    FilterByCategoryPipe,
    SearchByTextPipe,
    MonthNamePipe,
    CategoryIconPipe,
    CategoryColorPipe,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule
  ],
  exports: [
    AmountDisplayComponent,
    CategoryBadgeComponent,
    CategoryIconComponent,
    DashboardCardComponent,
    ProgressBarCategoryComponent,
    FilterBarComponent,
    DateFieldComponent,
    InputFieldComponent,
    SelectFieldComponent,
    PhotoGalleryModalComponent,
    PhotoPreviewComponent,
    PhotoSelectorComponent,
    EmptyStateComponent,
    TransactionDetailsComponent,
    TransactionFormComponent,
    TransactionItemComponent,
    CurrencyFormatPipe,
    DateFormatPipe,
    FilterByTypePipe,
    FilterByCategoryPipe,
    SearchByTextPipe,
    MonthNamePipe,
    CategoryIconPipe,
    CategoryColorPipe
  ]
})
export class SharedModule { }
