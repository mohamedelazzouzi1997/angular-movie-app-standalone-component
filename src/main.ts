import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { AppRoutes } from './app/app-routes';
import { HttpClientModule } from '@angular/common/http';
import { provideAnimations, BrowserAnimationsModule } from '@angular/platform-browser/animations';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(BrowserModule, HttpClientModule, BrowserAnimationsModule),
    provideRouter(AppRoutes, withComponentInputBinding()),
    provideAnimations(),
  ],
}).catch(console.error);
