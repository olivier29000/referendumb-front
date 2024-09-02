import { Injectable, WritableSignal, computed, effect, signal, untracked } from '@angular/core';
import { StoreService } from './store.service';
import { Language, languageList } from '../models/language.model';
import { LanguageService } from './language.service';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  constructor(
    private store : StoreService,
    private languageService : LanguageService
  ) {
   }

   currentLanguage = this.store.currentLanguage.asReadonly() // async uploadImage(formData : FormData, groupeId : number): Promise<void> { await this._effectService.uploadImage(formData, groupeId) }
   availableLanguageList = computed(() => languageList.filter(l => l.label !== this.currentLanguage().label))
   selectLanguage(language : Language) : void {
    this.languageService.selectLanguage(language)
  }

}
