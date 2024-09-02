
import { Injectable, WritableSignal, signal } from '@angular/core';
import { Language, languageList } from '../models/language.model';


@Injectable({
  providedIn: 'root'
})
export class StoreService {
  currentLanguage: WritableSignal<Language> = signal(languageList[0]);
   
  constructor() { }

}

