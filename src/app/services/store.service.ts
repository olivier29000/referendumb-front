import { Injectable, WritableSignal, signal } from "@angular/core";
import { Language, languageList } from "../models/language.model";
import { Menu, MENUITEMLIST } from "../home/home-models/menu.model";
import { UserConnected } from "../home/home-models/user-connected.model";

@Injectable({
  providedIn: "root",
})
export class StoreService {
  isLoading: WritableSignal<boolean> = signal(false);

  currentLanguage: WritableSignal<Language> = signal(languageList[0]);

  userConnected: WritableSignal<UserConnected | undefined> = signal(undefined);

  errorMessage: WritableSignal<string> = signal("");

  constructor() {}
}
