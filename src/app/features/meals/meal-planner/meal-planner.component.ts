import { WeekDay } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment';
import { BehaviorSubject, map, mergeMap, Observable, of, Subject, switchMap, takeUntil, zip } from 'rxjs';
import { FoodCategory, MealType } from 'src/app/core/enums';
import { DailyMealPlanView, MealDto, MealPlanDto, MealPlanNutritionInfo, RecipeDto } from 'src/app/core/models/dtos';
import {
  CreateMealPlanRequest,
  CreateMealRequest,
  DeleteMealsByDateRequest,
  GetWeeklyMealPlanRequest,
  UpdateMealPlanRequest
} from 'src/app/core/models/requests';
import { LookupService, MealService, RecipeService, SpinnerService } from 'src/app/core/services';
import { FormOption } from '../../../shared/components/form-controls/form-item';
import { Helpers } from '../../../shared/utilities/helpers';
import {
  MealDateListOfRecipeIdByMealType,
  MealSelectionModalComponent,
  MealSelectionModalData
} from './meal-selection-modal/meal-selection-modal.component';

@Component({
  selector: 'app-meal-planner',
  templateUrl: './meal-planner.component.html',
  styleUrls: ['./meal-planner.component.scss']
})
export class MealPlannerComponent implements OnInit, OnDestroy {
  private _unsubscribe: Subject<void> = new Subject();
  private _mealPlan!: MealPlanDto;

  daysOfWeek: Date[] = [];
  totalWeekZenScore: number = 0;
  mealPlanId: number = 0;
  mealPlanServingSize: number = 0;

  mealTypes: FormOption[] = [];
  weeklyMealPlan$: Observable<DailyMealPlanView[]> = new Observable();

  weekFilterOption$: BehaviorSubject<GetWeeklyMealPlanRequest> = new BehaviorSubject<GetWeeklyMealPlanRequest>({
    startDate: moment().startOf('week').format('YYYY-MM-DD').toString(),
    endDate: moment().endOf('week').format('YYYY-MM-DD').toString()
  });

  foodCategories: FormOption[] = [];
  recipes: RecipeDto[] = [];
  recipesByMeal: RecipeDto[] = [];

  constructor(
    private lookupService: LookupService,
    private mealService: MealService,
    private recipeService: RecipeService,
    private dialog: MatDialog,
    public spinnerService: SpinnerService
  ) {}
  ngOnDestroy(): void {
    this._unsubscribe.next();
    this._unsubscribe.complete();
  }

  ngOnInit(): void {
    this.lookupService
      .getMealTypes()
      .pipe(takeUntil(this._unsubscribe))
      .subscribe((mealTypes) => (this.mealTypes = Helpers.setFormOptions(mealTypes, 'mealTypeId', 'mealTypeName')));

    this.lookupService
      .getFoodCategories()
      .pipe(takeUntil(this._unsubscribe))
      .subscribe((categories) => {
        const leafyGreens = categories.splice(
          categories.findIndex((c) => c.foodCategoryId === FoodCategory.LeafyGreens),
          1
        )[0];
        categories.push(leafyGreens);

        const breakfast = categories.find((c) => c.foodCategoryId === FoodCategory.Breakfast)!;
        breakfast.foodCategoryName = 'Zen';

        this.foodCategories = Helpers.setFormOptions(categories, 'foodCategoryId', 'foodCategoryName');
      });

    this.recipeService
      .getRecipes()
      .pipe(takeUntil(this._unsubscribe))
      .subscribe((recipes) => (this.recipes = recipes));

    this.weeklyMealPlan$ = this.weekFilterOption$.pipe(
      switchMap((request) =>
        this.mealService.getWeeklyMealPlan(request).pipe(
          mergeMap((mealPlan) => {
            if (mealPlan) return of(mealPlan);

            const createRequest: CreateMealPlanRequest = {
              startDate: request.startDate,
              endDate: request.endDate,
              servingSize: 1,
              isTemplate: false
            };

            return this.mealService.createMealPlan(createRequest).pipe(
              map((mealPlanId: number) => {
                const mealPlan: MealPlanDto = createRequest as MealPlanDto;
                mealPlan.mealPlanId = mealPlanId;
                return mealPlan;
              })
            );
          }),
          map((mealPlan) => {
            this._mealPlan = mealPlan;
            this.mealPlanId = mealPlan.mealPlanId;
            this.mealPlanServingSize = mealPlan.servingSize;

            if (!mealPlan)
              this.mealService.createMealPlan({
                startDate: request.startDate,
                endDate: request.endDate,
                servingSize: 1,
                isTemplate: false
              });

            return this.setDaysOfWeek(mealPlan);
          })
        )
      )
    );
  }

  getRecipesByMeal(data: { mealPlan: DailyMealPlanView; mealType: MealType; foodCategory?: FoodCategory }): void {
    const { mealPlan, mealType, foodCategory } = data;

    const modalData: MealSelectionModalData = {
      mealPlan,
      mealType,
      foodCategory: foodCategory ? foodCategory : mealType === MealType.Breakfast ? FoodCategory.Breakfast : FoodCategory.Protein,
      recipes: this.recipes,
      mealTypes: this.mealTypes,
      foodCategories: this.foodCategories
    };

    const dialogRef = this.dialog.open(MealSelectionModalComponent, {
      data: modalData,
      autoFocus: false,
      height: '80vh',
      width: '50vw'
    });

    const mealDate = moment(mealPlan.mealDate).format('YYYY-MM-DD');

    dialogRef.afterClosed().subscribe((result) => {
      if (result?.selectedRecipes) {
        const requests: CreateMealRequest[] = Object.keys(MealType)
          .filter((m) => !+m)
          .map((m) => m.toLowerCase())
          .map((type) => ({
            mealDate: mealDate,
            mealPlanId: this.mealPlanId,
            recipeIds: result.selectedRecipes[type as keyof MealDateListOfRecipeIdByMealType],
            mealTypeId: type === 'breakfast' ? MealType.Breakfast : type === 'lunch' ? MealType.Lunch : MealType.Dinner
          }));

        zip(...requests.map((request) => of(request).pipe(mergeMap((request) => this.mealService.createMeal(request))))).subscribe(() =>
          this.weekFilterOption$.next(this.weekFilterOption$.value)
        );
      }
    });
  }

  setWeekFilterOptions(request: GetWeeklyMealPlanRequest): void {
    this.weekFilterOption$.next(request);
  }

  updateMealPlanServingSize(servingSize: number): void {
    const request: UpdateMealPlanRequest = {
      mealPlanId: this._mealPlan.mealPlanId!,
      startDate: this._mealPlan.startDate,
      endDate: this._mealPlan.endDate,
      isTemplate: this._mealPlan.isTemplate,
      servingSize: servingSize
    };

    this.mealService.updateMealPlan(request).subscribe(() => this.weekFilterOption$.next(this.weekFilterOption$.value));
  }

  deleteMealsByMealPlan(mealPlanId: number): void {
    this.mealService.deleteMealsByMealPlanId(mealPlanId).subscribe(() => this.weekFilterOption$.next(this.weekFilterOption$.value));
  }

  deleteMealsByDate(request: DeleteMealsByDateRequest): void {
    this.mealService.deleteMealsByDate(request).subscribe(() => this.weekFilterOption$.next(this.weekFilterOption$.value));
  }

  private setDaysOfWeek(mealPlan?: MealPlanDto): DailyMealPlanView[] {
    this.daysOfWeek = [];
    const mealsForTheWeek: DailyMealPlanView[] = [];

    const startOfWeek = moment(this.weekFilterOption$.value.startDate).startOf('week');
    const endOfWeek = moment(this.weekFilterOption$.value.endDate).endOf('week');

    for (let day = startOfWeek; day.isSameOrBefore(endOfWeek); day.add(1, 'day')) {
      const mealDate = day.toDate();
      const meals = mealPlan?.meals || [];

      const breakfast = this.mapMealsByMealType(this.mapMealsByTypeAndDate(meals, MealType.Breakfast, mealDate), MealType.Breakfast);
      const lunch = this.mapMealsByMealType(this.mapMealsByTypeAndDate(meals, MealType.Lunch, mealDate), MealType.Lunch);
      const dinner = this.mapMealsByMealType(this.mapMealsByTypeAndDate(meals, MealType.Dinner, mealDate), MealType.Dinner);

      const totalServiceSizeForDay = breakfast.totalZenScore + lunch.totalZenScore + dinner.totalZenScore;

      this.daysOfWeek.push(mealDate);

      mealsForTheWeek.push({
        day: WeekDay[mealDate.getDay()],
        totalMealScore: totalServiceSizeForDay / 25,
        totalMealScoreClass: this.getTotalMealScoreClass(totalServiceSizeForDay / 25),
        mealDate,
        breakfast,
        lunch,
        dinner
      });
    }

    this.totalWeekZenScore = mealsForTheWeek.map((m) => m.totalMealScore).reduce((acc, current) => acc + current, 0) / 7;
    return mealsForTheWeek;
  }

  private mapMealsByTypeAndDate(meals: MealDto[], mealType: MealType, mealDate: Date): MealDto[] {
    if (meals.length === 0) return [];

    return meals.filter(
      (m) => m.mealTypeId === mealType && moment(m.mealDate).format('YYYY-MM-DD') === moment(mealDate).format('YYYY-MM-DD')
    );
  }

  private getTotalMealScoreClass(totalMealScore: number): 'primary' | 'warning' | 'danger' | 'secondary' {
    if (totalMealScore > 0.99) return 'primary';
    else if (totalMealScore >= 0.5 && totalMealScore <= 0.99) return 'warning';
    else if (totalMealScore > 0 && totalMealScore < 0.5) return 'danger';
    else return 'secondary';
  }

  private mapMealsByMealType(meals: MealDto[], mealType: MealType): MealPlanNutritionInfo {
    let total = 0;

    if (mealType === MealType.Breakfast) {
      const zen = this.computeServingsByFoodCategory(meals, FoodCategory.Breakfast);

      if (zen > 0) total += 2;
      if (zen === 1) total++;

      return {
        meals,
        totalZenScore: total,
        zen: zen
      };
    }

    const protein = this.computeServingsByFoodCategory(meals, FoodCategory.Protein);
    const leafyGreens = this.computeServingsByFoodCategory(meals, FoodCategory.LeafyGreens);
    const carbohydrate = this.computeServingsByFoodCategory(meals, FoodCategory.Carbohydrate);
    const vegetables = this.computeServingsByFoodCategory(meals, FoodCategory.Vegetables);

    if (protein > 0) total += 1;
    if (vegetables > 0) total += 1;
    if (leafyGreens > 0) total += 5;
    if (carbohydrate > 0) total += 1;
    if (protein > 0 && carbohydrate > 0) total += 2;
    if (leafyGreens + protein + carbohydrate + vegetables === 4) total += 1;

    return {
      meals,
      totalZenScore: total,
      protein,
      leafyGreens,
      carbohydrate,
      vegetables
    };
  }

  private computeServingsByFoodCategory(meals: MealDto[], foodCategory: FoodCategory): number {
    return meals
      .flatMap((m) => m.recipe.recipeCategories)
      .filter((r) => r.foodCategoryId === foodCategory)
      .map((rc) => rc.portion)
      .reduce((acc, current) => acc + current, 0);
  }
}
