import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AppNav {
  static navSource: any;

  static getNavsource = () => {
    return AppNav.navSource;
  };

  static setNavsource= (source: any) => {
    return (AppNav.navSource = source);
  };
}
