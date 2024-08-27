import { InjectionToken } from '@angular/core';

export interface AppConfig {
  apiEndpoint: string;
  appTitle: string;
}

export const APP_CONFIG = new InjectionToken<AppConfig>('app.config');

export const APP_DI_CONFIG: AppConfig = {
  apiEndpoint: '',
  appTitle: 'Sistema de Agendamiento de Atención a Proveedores'
};
