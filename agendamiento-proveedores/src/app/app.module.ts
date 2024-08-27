import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routes';
import { FormsModule } from '@angular/forms';
import { APP_CONFIG, APP_DI_CONFIG } from './app.config'; // Import APP_CONFIG and APP_DI_CONFIG

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    { provide: APP_CONFIG, useValue: APP_DI_CONFIG } // Provide APP_CONFIG here
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
