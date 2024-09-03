import { Component, Input, output } from '@angular/core';
import { ServerService } from '../../services/server.service';
import { Language } from 'src/app/models/language.model';

@Component({
  selector: 'app-header',
  template:`
  <div class="page-header">
  <div class="row">
    <div class="col-2 d-flex">
    <div id="sidebar-toggle" class="toggle-sidebar" (click)="onSidebarToggle()">
    
    @if(sideBarOpen){
      <app-feather-icons [icon]="'menu'"></app-feather-icons>
      

    }@else {
      <app-feather-icons [icon]="'chevrons-left'"></app-feather-icons>

    }
    
    
    
    </div>

    </div>
    
    <div class="col-8 text-center">
    
      <h3 style="justify-content: right;"> 
          <small>Boilerplate d'application Angular</small>
        </h3>
    
        
    </div>
    <div class="col-2 d-flex justify-content-end ">
    <ul class="header-menu ">
        <li class="profile-avatar notification-box onhover-dropdown text-center">
      <div>
        <img [src]="currentLanguage().imageUrl" class="img-fluid" alt="">
      </div>
      <div class="notification-dropdown onhover-show-div">
  <div class="dropdown-title">
    <h6>Available languages</h6>
    </div>
  <ul>
    @for (language of availableLanguageList(); track language) {
        <li (click)="selectLanguage(language)">
      <img [src]="language.imageUrl" class="img-fluid" alt="">
      </li>
    }
      
    
  </ul>
</div>


        </li>
            
        </ul>
      <a (click)="logoutClickEvent()">
        <app-feather-icons [icon]="'log-out'"></app-feather-icons>
      </a>
    </div>
  </div>
</div>
 
`
})
export class HeaderSmartComponent {

    constructor(private serverService : ServerService){}
   currentLanguage = this.serverService.currentLanguage;
   availableLanguageList = this.serverService.availableLanguageList;
   selectLanguage(language : Language) : void {
    this.serverService.selectLanguage(language)
  }
  @Input() sideBarOpen : boolean;
  logoutClick = output<void>();
  sidebarToggle = output<void>();
  logoutClickEvent(): void {
    this.logoutClick.emit();
  }

  

  onSidebarToggle(){

    this.sidebarToggle.emit()
  }

  
}
