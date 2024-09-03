
import { Injectable, WritableSignal, signal } from '@angular/core';
import { Language, languageList } from '../models/language.model';
import { Menu, MENUITEMLIST } from '../home/home-models/menu.model';
import { UserConnected } from '../home/home-models/user-connected.model';


@Injectable({
  providedIn: 'root'
})
export class StoreService {

  currentLanguage: WritableSignal<Language> = signal(languageList[0]);
  
  userConnected: WritableSignal<UserConnected | undefined> = signal(undefined);
  
  creationCompteIsLoading: WritableSignal<boolean> = signal(false); 
authentificationIsLoading: WritableSignal<boolean> = signal(false); 
  errorMessage: WritableSignal<string> = signal("");

  constructor() { }

}

