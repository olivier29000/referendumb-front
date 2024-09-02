import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ServerService } from './server.service';
import { Language, languageList } from '../models/language.model';
import { StoreService } from './store.service';

type language = "fr" | "en";
@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  language: language;

  constructor(
    public translateService: TranslateService,
    private store : StoreService
  ) {}
  

  initLanguage(){
    this.translateService.addLangs(languageList.map(l => l.label))
    this.translateService.setDefaultLang(this.store.currentLanguage().label)

  }

  selectLanguage(language : Language) : void {
    this.translateService.setDefaultLang(language.label)
    this.store.currentLanguage.set(language)
  }

}
