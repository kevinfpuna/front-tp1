import { Component, Inject } from '@angular/core';
import { APP_CONFIG, AppConfig } from './app.config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title: string;

  constructor(@Inject(APP_CONFIG) private config: AppConfig) {
    this.title = config.appTitle;
  }
}
