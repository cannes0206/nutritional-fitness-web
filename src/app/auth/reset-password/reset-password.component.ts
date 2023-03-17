import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormItem } from '../../shared/components/form-controls';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm = new FormGroup({});
  newPassword: FormItem = { controlName: 'newPassword', label: 'New Password', required: true, icon: 'visibility_off' };
  confirmPassword: FormItem = { controlName: 'confirmPassword', label: 'Confirm Password', required: true, icon: 'visibility_off' };
  isNewPasswordShow: boolean = false;
  isConfirmPasswordShow: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.setFormGroup();
  }

  resetPassword(): void {

  }

  showNewPassword(): void {
    this.isNewPasswordShow = !this.isNewPasswordShow;
    this.newPassword.icon = this.isNewPasswordShow ? 'visibility' : 'visibility_off';
  }

  showConfirmPassword(): void {
    this.isConfirmPasswordShow = !this.isConfirmPasswordShow;
    this.confirmPassword.icon = this.isConfirmPasswordShow ? 'visibility' : 'visibility_off';
  }

  private setFormGroup(): void {
    this.resetPasswordForm.addControl(this.newPassword.controlName, new FormControl('', Validators.required));
    this.resetPasswordForm.addControl(this.confirmPassword.controlName, new FormControl('', Validators.required));
  }
}
