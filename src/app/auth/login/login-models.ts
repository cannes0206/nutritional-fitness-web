import { FormItem } from "../../shared/components/form-controls/form-item";

export abstract class LoginFormItems {
  static username: FormItem = { controlName: 'username', label: 'Username', required: true, icon: 'person' };
  static password: FormItem = { controlName: 'password', label: 'Password', required: true, icon: 'visibility_off' };
}
