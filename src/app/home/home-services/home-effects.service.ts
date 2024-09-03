import { Injectable } from '@angular/core';
import { HomeStoreService } from './home-store.service';


@Injectable({
  providedIn: 'root'
})
export class HomeEffectService {

    constructor(private homeStore :HomeStoreService){}
    
    setSidebarOpen(value :boolean):void {this.homeStore.sidebarOpen.set(value)}

}
