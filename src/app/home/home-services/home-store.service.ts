
import { Injectable, WritableSignal, signal } from '@angular/core';
import { Menu, MENUITEMLIST } from '../home-models/menu.model';
import { UserConnected } from '../home-models/user-connected.model';


@Injectable({
  providedIn: 'root'
})
export class HomeStoreService {
  menuList : WritableSignal<Menu[]> = signal(MENUITEMLIST);
  sidebarOpen: WritableSignal<boolean> = signal(false);
  constructor() { }

}

