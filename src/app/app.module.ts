import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { AuthHttpIntercepetor } from './auth/auth-http-intercepetor';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    HttpClientModule
    
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass:AuthHttpIntercepetor, multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
