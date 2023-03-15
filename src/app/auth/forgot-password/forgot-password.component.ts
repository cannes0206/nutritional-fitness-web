import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppRoutes } from '../../core/enums';
import { FormItem } from '../../shared/components/form-controls';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm = new FormGroup({});
  email: FormItem = { controlName: 'email', label: 'Email', required: true };

  signInRoute = `${AppRoutes.Auth}`;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.seForgotPasswordFormGroup();
  }

  navigateToSignInPage(): void {
    this.router.navigateByUrl(this.signInRoute);
  }

  private seForgotPasswordFormGroup(): void {
    this.forgotPasswordForm.addControl(this.email.controlName, new FormControl('', Validators.required));
  }

}
