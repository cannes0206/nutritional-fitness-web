import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { SharedModule } from '../shared/shared.module';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AdvertisementCarouselComponent } from './advertisement-carousel/advertisement-carousel.component';

@NgModule({
  declarations: [LoginComponent, ForgotPasswordComponent, AdvertisementCarouselComponent],
  imports: [CommonModule, AuthRoutingModule, SharedModule]
})
export class AuthModule {}
