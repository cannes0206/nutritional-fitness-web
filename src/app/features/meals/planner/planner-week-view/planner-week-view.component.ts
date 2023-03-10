import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import * as moment from 'moment';
import { debounceTime, Subject, takeUntil } from 'rxjs';
import { MealPlannerWeekView } from 'src/app/core/models/dtos';
import { DeleteMealsByDateRequest, GetRecipesByMealRequest, GetWeeklyMealPlanRequest } from 'src/app/core/models/requests';
import { MealDto } from '../../../../core/models/dtos/meal-dto';
import { FormOption } from '../../../../shared/components/form-controls/form-item';
import { FoodCategory } from '../../../../core/enums/food-category.enum';
import { MealType } from '../../../../core/enums/meal-type.enum';

@Component({
  selector: 'app-planner-week-view',
  templateUrl: './planner-week-view.component.html',
  styleUrls: ['./planner-week-view.component.scss']
})
export class PlannerWeekViewComponent implements OnInit, OnDestroy, OnChanges {
  private _unsubscribe: Subject<void> = new Subject<void>();

  currentDay: string = moment().date().toString();
  noOfServingsControl: FormControl = new FormControl('');
  weekControl: FormControl = new FormControl('');

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

  constructor() {}

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

  clear(): void {
    this.deleteMealsByMealPlanId.emit(this.mealPlanId);
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
