import { FormItem, ValidationType } from "../../shared/components/form-controls";

export abstract class SignUpFormItems {
  static personName: FormItem = { controlName: 'name', label: 'Name', required: true };
  static birthDate: FormItem = { controlName: 'birthDate', label: 'Date of Birth', required: true };
  static gender: FormItem = { controlName: 'gender', label: 'Gender', required: true };
  static country: FormItem = { controlName: 'country', label: 'Country', required: true };
  static startWeight: FormItem = { controlName: 'startWeight', label: 'Weight', required: true };
  static weightMeasurement: FormItem = { controlName: 'weightMeasurement', label: ''};
  static startHeight: FormItem = { controlName: 'startHeight', label: 'Height', required: true };
  static heightMeasurement: FormItem = { controlName: 'heightMeasurement', label: ''};
  static userName: FormItem = { controlName: 'userName', label: 'Username', required: true };
  static email: FormItem = { controlName: 'email', label: 'Email', required: true, validationType: ValidationType.email };
  static confirmPassword: FormItem = { controlName: 'confirmPassword', label: 'Confirm Password', required: true, icon: 'visibility_off' };
  static password: FormItem = { controlName: 'password', label: 'Password', required: true, icon: 'visibility_off' };
}
