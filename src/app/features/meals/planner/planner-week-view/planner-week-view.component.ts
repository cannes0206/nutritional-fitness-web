import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, Subject, takeUntil } from 'rxjs';
import { MealDto, MealPlannerWeekView } from 'src/app/core/models/dtos';
import { DeleteMealsByDateRequest, GetRecipesByMealRequest, GetWeeklyMealPlanRequest } from 'src/app/core/models/requests';
import { FoodCategory } from '../../../../core/enums/food-category.enum';
import { MealType } from '../../../../core/enums/meal-type.enum';
import { FormOption } from '../../../../shared/components/form-controls/form-item';

import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import * as _moment from 'moment';

// eslint-disable-next-line no-unused-vars
import { animate, state, style, transition, trigger } from '@angular/animations';
import { WeekDay } from '@angular/common';
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
  ],
  animations: [
    trigger('slideAnimation', [
      state(
        'prev',
        style({
          transform: 'translateX(100%)'
        })
      ),
      state(
        'next',
        style({
          transform: 'translateX(-100%)'
        })
      ),
      state(
        'void',
        style({
          transform: 'translateX(100%)',
          opacity: 0
        })
      ),
      transition('* => prev', animate('0.5s ease-in-out')),
      transition('* => next', animate('0.5s ease-in-out')),
      transition('void => *', animate('0.5s ease-in-out'))
    ])
  ]
})
export class PlannerWeekViewComponent implements OnInit, OnDestroy, OnChanges {
  private _unsubscribe: Subject<void> = new Subject<void>();

  slideState: string = '';
  selectedDate: string = '';
  selectedDateClass: string = '';
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

  constructor(private dialog: MatDialog, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.noOfServingsControl.valueChanges.pipe(debounceTime(250), takeUntil(this._unsubscribe)).subscribe((value: number) => {
      if (!value) this.noOfServingsControl.setValue(1, { emitEvent: false });
      if (value && value > 100) this.noOfServingsControl.setValue(100, { emitEvent: false });
      this.updateServingSize.emit(this.noOfServingsControl.value);
    });

    this.weekControl.valueChanges.subscribe((value) => {
      this.selectedDate = moment(value).toString();

      if (!this.mealsForTheWeek.some((m) => moment(m.mealDate).isSame(moment(this.selectedDate), 'date'))) {
        this.weeklyMealPlanFilter.emit({
          userId: 'test_user_id',
          startDate: moment(value).startOf('week').format('YYYY-MM-DD').toString(),
          endDate: moment(value).endOf('week').format('YYYY-MM-DD').toString()
        });
      } else {
        this.scrollToContainer(new Date(value));
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { mealPlanServingSize, mealsForTheWeek } = changes;

    if (mealPlanServingSize && mealPlanServingSize.currentValue)
      this.noOfServingsControl.setValue(mealPlanServingSize.currentValue, { emitEvent: false });

    if (mealsForTheWeek && mealsForTheWeek.currentValue) {
      this.slideContent('');

      if (this.selectedDate && this.mealsForTheWeek.some((m) => moment(m.mealDate).isSame(moment(this.selectedDate), 'date')))
        this.scrollToContainer(new Date(this.selectedDate));
      else this.scrollToContainer();
    }
  }

  ngOnDestroy(): void {
    this._unsubscribe.next();
    this._unsubscribe.complete();
  }

  slideContent(direction: string) {
    this.slideState = direction;
  }

  scrollToContainer(day?: Date, event?: MouseEvent): void {
    const element = event?.target as HTMLElement;

    if (element && element.classList.contains('mat-icon')) {
      const arrow = element.innerText;

      if (arrow === 'keyboard_arrow_left') this.updateWeekRange('prev');
      else if (arrow === 'keyboard_arrow_right') this.updateWeekRange('next');
    } else {
      if (day) {
        this.selectedDate = day.toString();

        const className = this.mealsForTheWeek.find((d) => moment(d.mealDate).isSame(moment(day), 'date'))?.totalMealScoreClass!;
        this.selectedDateClass = `bg-${className}`;
      }

      const container = `${WeekDay[day ? day.getDay() : WeekDay.Sunday].toLowerCase()}-container`;
      const element = document.getElementById(container);

      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }

  setMonthAndYear(normalizedMonthAndYear: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.weekControl.value!;
    ctrlValue.month(normalizedMonthAndYear.month());
    ctrlValue.year(normalizedMonthAndYear.year());
    this.weekControl.setValue(ctrlValue, { emitEvent: false });

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

  today(): void {
    if (!this.mealsForTheWeek.some((m) => moment(m.mealDate).isSame(moment(), 'date'))) {
      this.weekControl.setValue(moment(), { emitEvent: false });

      this.selectedDate = moment().toString();

      this.weeklyMealPlanFilter.emit({
        userId: 'test_user_id',
        startDate: moment().startOf('week').format('YYYY-MM-DD').toString(),
        endDate: moment().endOf('week').format('YYYY-MM-DD').toString()
      });

      const slideDirection = moment().isBefore(moment(this.daysOfWeek[0], 'date')) ? 'prev' : 'next';
      this.slideContent(slideDirection);
    } else {
      this.scrollToContainer(new Date());
    }
  }

  deleteMealByDate(meal: MealDto): void {
    this.deleteMealsByDate.emit({
      mealPlanId: this.mealPlanId,
      mealDate: meal.mealDate
    });
  }

  updateWeekRange(direction: 'prev' | 'next', event?: MouseEvent): void {
    event?.stopPropagation();

    this.slideContent(direction);

    const startOfWeek =
      direction === 'prev'
        ? moment(this.daysOfWeek[0], 'YYYY-MM-DD').startOf('week').subtract(1, 'week')
        : moment(this.daysOfWeek[0], 'YYYY-MM-DD').startOf('week').add(1, 'week');

    const endOfWeek =
      direction === 'prev'
        ? moment(this.daysOfWeek[this.daysOfWeek.length - 1], 'YYYY-MM-DD')
            .endOf('week')
            .subtract(1, 'week')
        : moment(this.daysOfWeek[this.daysOfWeek.length - 1], 'YYYY-MM-DD')
            .endOf('week')
            .add(1, 'week');

    this.selectedDate = '';
    this.selectedDateClass = '';

    this.weeklyMealPlanFilter.emit({
      userId: 'test_user_id',
      startDate: startOfWeek.toString(),
      endDate: endOfWeek.toString()
    });
  }
}
