import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { ConfigService } from './core/services/config.service';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppConfig } from './core/models/app-config';
import { AppRoutingModule } from './app-routing.module';
import { SideNavComponent } from './shell/side-nav/side-nav.component';
import { HttpRequestInterceptor } from './core/interceptors/http-interceptor.';

function initConfig(configService: ConfigService) {
  return () => configService.load();
}
@NgModule({
  declarations: [AppComponent, SideNavComponent],
  imports: [BrowserModule, BrowserAnimationsModule, SharedModule, CoreModule, HttpClientModule, AppRoutingModule],
  bootstrap: [AppComponent],
  providers: [
    {
      provide: AppConfig,
      deps: [HttpClient],
      useExisting: ConfigService
    },
    {
      provide: APP_INITIALIZER,
      useFactory: initConfig,
      deps: [ConfigService],
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpRequestInterceptor,
      multi: true
    },
  ]
})
export class AppModule {}
