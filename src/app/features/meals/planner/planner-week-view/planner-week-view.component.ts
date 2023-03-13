import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, Subject, takeUntil } from 'rxjs';
import { MealPlannerWeekView } from 'src/app/core/models/dtos';
import { DeleteMealsByDateRequest, GetRecipesByMealRequest, GetWeeklyMealPlanRequest } from 'src/app/core/models/requests';
import { FoodCategory } from '../../../../core/enums/food-category.enum';
import { MealType } from '../../../../core/enums/meal-type.enum';
import { MealDto } from '../../../../core/models/dtos/meal-dto';
import { FormOption } from '../../../../shared/components/form-controls/form-item';

import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import * as _moment from 'moment';

// eslint-disable-next-line no-unused-vars
import { MatDatepicker } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { default as _rollupMoment, Moment } from 'moment';
import {
  DeleteConfirmationModalComponent,
  DeleteMealPlanConfirmationModalData
} from '../delete-confirmation-modal/delete-confirmation-modal.component';

const moment = _rollupMoment || _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY'
  },
  display: {
    dateInput: 'MMMM YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  }
};
@Component({
  selector: 'app-planner-week-view',
  templateUrl: './planner-week-view.component.html',
  styleUrls: ['./planner-week-view.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }
  ]
})
export class PlannerWeekViewComponent implements OnInit, OnDestroy, OnChanges {
  private _unsubscribe: Subject<void> = new Subject<void>();

  currentDay: string = moment().date().toString();
  noOfServingsControl: FormControl = new FormControl('');
  weekControl: FormControl = new FormControl(moment());

  foodCategoryEnum = FoodCategory;
  mealTypeEnum = MealType;

  @Input() daysOfWeek: Date[] = [];
  @Input() mealPlanId: number = 0;
  @Input() totalWeekZenScore: number = 0;
  @Input() mealPlanServingSize: number = 0;
  @Input() mealsForTheWeek: MealPlannerWeekView[] = [];

  @Input() mealTypes: FormOption[] = [];
  @Input() foodCategories: FormOption[] = [];

  @Output() weeklyMealPlanFilter: EventEmitter<GetWeeklyMealPlanRequest> = new EventEmitter();
  @Output() updateServingSize: EventEmitter<number> = new EventEmitter();
  @Output() deleteMealsByMealPlanId: EventEmitter<number> = new EventEmitter();
  @Output() deleteMealsByDate: EventEmitter<DeleteMealsByDateRequest> = new EventEmitter();
  @Output() selectedMeal: EventEmitter<{ request: GetRecipesByMealRequest; foodCategory?: FoodCategory }> = new EventEmitter();

  constructor(private dialog: MatDialog) {}

  ngOnDestroy(): void {
    this._unsubscribe.next();
    this._unsubscribe.complete();
  }

  ngOnInit(): void {
    this.noOfServingsControl.valueChanges.pipe(debounceTime(250), takeUntil(this._unsubscribe)).subscribe((value: number) => {
      if (!value) this.noOfServingsControl.setValue(1, { emitEvent: false });
      if (value && value > 100) this.noOfServingsControl.setValue(100, { emitEvent: false });
      this.updateServingSize.emit(this.noOfServingsControl.value);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { mealPlanServingSize } = changes;

    if (mealPlanServingSize && mealPlanServingSize.currentValue)
      this.noOfServingsControl.setValue(mealPlanServingSize.currentValue, { emitEvent: false });
  }

  setMonthAndYear(normalizedMonthAndYear: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.weekControl.value!;
    ctrlValue.month(normalizedMonthAndYear.month());
    ctrlValue.year(normalizedMonthAndYear.year());
    this.weekControl.setValue(ctrlValue);

    this.weeklyMealPlanFilter.emit({
      userId: 'test_user_id',
      startDate: moment(this.weekControl.value).startOf('month').startOf('week').format('YYYY-MM-DD').toString(),
      endDate: moment(this.weekControl.value).startOf('month').endOf('week').format('YYYY-MM-DD').toString()
    });

    datepicker.close();
  }

  clear(): void {
    const data: DeleteMealPlanConfirmationModalData = {
      startDate: this.daysOfWeek[0],
      endDate: this.daysOfWeek[this.daysOfWeek.length - 1]
    };

    const dialogRef = this.dialog.open(DeleteConfirmationModalComponent, { data, autoFocus: false });

    dialogRef.afterClosed().subscribe((result) => {
      if (result?.confirmed) {
        this.deleteMealsByMealPlanId.emit(this.mealPlanId);
      }
    });
  }

  onSelectMeal(meal: MealPlannerWeekView, mealType: MealType, foodCategory?: FoodCategory): void {
    const request: GetRecipesByMealRequest = {
      mealTypeId: mealType,
      mealPlanId: this.mealPlanId,
      mealDate: moment(meal.mealDate).format('YYYY-MM-DD')
    };

    this.selectedMeal.emit({ request, foodCategory });
  }

  resetWeek(): void {
    this.weekControl.setValue(moment(), { emitEvent: false });

    this.weeklyMealPlanFilter.emit({
      userId: 'test_user_id',
      startDate: moment().startOf('week').format('YYYY-MM-DD').toString(),
      endDate: moment().endOf('week').format('YYYY-MM-DD').toString()
    });
  }

  deleteMealByDate(meal: MealDto): void {
    this.deleteMealsByDate.emit({
      mealPlanId: this.mealPlanId,
      mealDate: meal.mealDate
    });
  }

  updateWeekRange(direction: 'previous' | 'next'): void {
    const startOfWeek =
      direction === 'previous'
        ? moment(this.daysOfWeek[0], 'YYYY-MM-DD').startOf('week').subtract(1, 'week')
        : moment(this.daysOfWeek[0], 'YYYY-MM-DD').startOf('week').add(1, 'week');

    const endOfWeek =
      direction === 'previous'
        ? moment(this.daysOfWeek[this.daysOfWeek.length - 1], 'YYYY-MM-DD')
            .endOf('week')
            .subtract(1, 'week')
        : moment(this.daysOfWeek[this.daysOfWeek.length - 1], 'YYYY-MM-DD')
            .endOf('week')
            .add(1, 'week');

    this.weeklyMealPlanFilter.emit({
      userId: 'test_user_id',
      startDate: startOfWeek.toString(),
      endDate: endOfWeek.toString()
    });
  }
}
