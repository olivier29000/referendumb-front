import { Injectable } from '@angular/core';
import { HomeStoreService } from './home-store.service';
import { HomeEffectService } from './home-effects.service';
import { ServerService } from '../../services/server.service';

@Injectable({
  providedIn: 'root'
})
export class HomeServerService {

  constructor(
    private homeStore : HomeStoreService,
    private serverService : ServerService,
    private homeEffect : HomeEffectService,

  ) {
   }

   sidebarOpen = this.homeStore.sidebarOpen.asReadonly();
  setSidebarOpen(value :boolean):void {this.homeEffect.setSidebarOpen(value)}
  menuList = this.homeStore.menuList.asReadonly();
   userConnected = this.serverService.userConnected;

   logout():void {this.serverService.logout()}
}
