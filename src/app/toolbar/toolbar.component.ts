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
    if (checked == true) {
      this.tipoCor = 'brightness_low';
    }
    if (checked == false) {
      this.tipoCor = 'dark_mode';
    }
    this.themeService.setDarkTheme(checked);
  }

/*   mudarCor(cor: string) {
    if (cor == 'noturno') {
      this.tipoCor = 'brightness_low';
    }
    if (cor == 'normal') {
      this.tipoCor = 'dark_mode';
    }
  } */
}
