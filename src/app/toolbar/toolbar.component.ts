import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../core/services/theme.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector:'app-toolbar',
  templateUrl:'./toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  isDarkTheme!: Observable<boolean>;
  tipoCor: string = 'dark_mode';

  constructor(private themeService: ThemeService) { }

  ngOnInit() {
    this.isDarkTheme = this.themeService.isDarkTheme;
  }

  toggleDarkTheme(checked: boolean) {
    let background = document.getElementsByClassName(
    'color-page'
  )[0] as HTMLElement;
    if (checked == true) {
      this.tipoCor = 'brightness_low';
      background.style.background = '#303030';
    }
    if (checked == false) {
      this.tipoCor = 'dark_mode';
      background.style.background = '#fafafa';
    }
    this.themeService.setDarkTheme(checked);
  }
/*   #000000de

  mudarCor(cor: string) {
    let background = document.getElementsByClassName(
      'color-page'
    )[0] as HTMLElement;
    let toolbar = document.getElementsByClassName('toolbar')[0] as HTMLElement;
    if (cor == 'noturno') {
      this.tipoCor = 'brightness_low';
      background.style.background = '#080808';
      toolbar.style.color = '#080808';
    }
    if (cor == 'normal') {
      this.tipoCor = 'dark_mode';
      background.style.background = '#fff';
      toolbar.style.color = '#fff';
    }
  } */
/*   mudarCor(cor: string) {
    if (cor == 'noturno') {
      this.tipoCor = 'brightness_low';
    }
    if (cor == 'normal') {
      this.tipoCor = 'dark_mode';
    }
  } */
}
