import { Component, OnInit } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-entete',
  templateUrl: './entete.component.html',
  styleUrls: ['./entete.component.css']
})
export class EnteteComponent implements OnInit {
  langue = {
    libelle: 'fr',
    drapeau: '../../assets/img/flags/fr.svg'
  };

  constructor(private translate: TranslateService) {
    translate.setDefaultLang('fr');
  }

  ngOnInit() {
  }

  switchLanguage(language: string) {
    this.translate.use(language);
    this.langue.libelle = language;
    if (language === 'en') {
      this.langue.drapeau = '../../assets/img/united-kingdom.svg';
    }
  }

}
