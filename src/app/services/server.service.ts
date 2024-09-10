import { Injectable, WritableSignal, computed, effect, signal, untracked } from '@angular/core';
import { StoreService } from './store.service';
import { Language, languageList } from '../models/language.model';
import { LanguageService } from './language.service';
import { EffectService } from './effect.service';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  constructor(
    private store : StoreService,
    private languageService : LanguageService,
    private effectService : EffectService
  ) {
   }

   userConnected = this.store.userConnected;
   currentLanguage = this.store.currentLanguage.asReadonly() // async uploadImage(formData : FormData, groupeId : number): Promise<void> { await this._effectService.uploadImage(formData, groupeId) }
   availableLanguageList = computed(() => languageList.filter(l => l.label !== this.currentLanguage().label))
   selectLanguage(language : Language) : void {this.languageService.selectLanguage(language)}
  
   
   
  authentification(email : string, password : string): void { this.effectService.authentification(email, password) }
  creationCompte(email : string, password : string): void { this.effectService.creationCompte(email, password) }
  logout(): void { this.effectService.logout() }
}
