import { Component } from '@angular/core';
import { HomeServerService } from '../home-services/home-server.service';

@Component({
  selector: 'app-menu',
  template: `
  
<div class="logo-wrap">
  <app-logo></app-logo>
</div>
<div class="main-sidebar">
  <!-- @if(userConnected(); as userConnected){ -->
    <div class="user-profile">
    <div class="media">
    <div class="change-pic">
      <img src="assets/images/avatar/3.jpg" class="img-fluid" alt="">
    </div>
    <div class="media-body">
      <a >
        <h6>userConnected.pseudo</h6>
      </a>
      <span class="font-roboto">userConnected.email</span>
    </div>
</div>
  </div>
  <!-- } -->

  @if(menuList(); as menus){
  <div id="mainsidebar">
    <ul class="sidebar-menu custom-scrollbar">
      <div *ngTemplateOutlet="recursiveMenu; context: { $implicit: menus }"></div>
      <ng-template #recursiveMenu let-menus>
        @for(item of menus; track item){
          <li [class.sidebar-item]="item.level == 1">
            <a [class.sidebar-link]="item.level == 1" 
            [ngClass]="{'only-link' : item.type == 'link' && item.level == 1, 'active': item.active}" 
            [routerLink]="item.path">
              <app-feather-icons [icon]="item.icon"></app-feather-icons>
              <span>{{ item.title }}</span>
              @if(item.badge){
                <span class="label label-shadow ms-1">{{ item.badgeText }}</span>
              }
              @if(item.type == 'sub' && item.level == 1){
                <div class="according-menu">
                  <i class="fa fa-angle-right"></i>
                </div>
              }
            </a>
            @for(child of item.children; track child){
              <ul class="nav-submenu menu-content" [ngStyle]="{'display' : item.active ? 'block' : 'none' }">
                <li >
                  <a  
                  [ngClass]="{'active': child.active}" 
                  [routerLink]="item.path + child.path">
                    <app-feather-icons [icon]="child.icon"></app-feather-icons>
                    <span>{{ child.title }}</span>
                    @if(child.badge){
                      <span class="label label-shadow ms-1">{{ child.badgeText }}</span>
                    }
                  </a>
                </li>
              </ul>
            }
          </li>
        }
      </ng-template>
      <!-- <li>
        <app-help></app-help>
      </li> -->
    </ul>
  </div>

      }

</div>`,
  styles: [``]
})
export class MenuSmartComponent {

  constructor(private homeServer : HomeServerService){}
  userConnected= this.homeServer.userConnected
  menuList = this.homeServer.menuList
}
