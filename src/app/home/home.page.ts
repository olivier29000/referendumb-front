import { Component, HostListener, OnInit } from '@angular/core';
import { AnalyticsService } from '../services/analytics.service';
import { HomeServerService } from './home-services/home-server.service';

@Component({
  template: `
  <div class="page-wrapper">
  <div class="page-main-header row" [class.close_icon]="sidebarOpen()">
  <div class="nav-right col p-0">
  <app-header [sideBarOpen]="sidebarOpen()" (logoutClick)="logout()" (sidebarToggle)="sidebarToggle()"></app-header>
  
</div>
  </div>
  <div class="page-body-wrapper">
    <div class="page-sidebar" [class.close_icon]="sidebarOpen()">
      <app-menu (sidebarToggle)="sidebarToggle()"></app-menu>
    </div>
    <div class="page-body">
    <router-outlet></router-outlet>
      
    </div>
    <footer class="footer">
      <!-- <app-footer></app-footer> -->
    </footer>
  </div>
</div>
`,
  styles: [``]
})
export class HomePageComponent implements OnInit {
    
  
  sidebarOpen = this.homeServer.sidebarOpen

  constructor(
    public analyticsService: AnalyticsService,
    private homeServer : HomeServerService
  ) { }

  @HostListener('window:resize', ['$event'])
    onResize(event: { target: { innerWidth: number; }; }) {
    let number = event.target.innerWidth;
    if(number < 992){
      this.homeServer.setSidebarOpen(true);
    }else{
      this.homeServer.setSidebarOpen(false);
    }
  }

    ngOnInit(): void {
        this.analyticsService.sendAnalyticPageView("/home", "page home")
    }

    sidebarToggle(){
      this.homeServer.setSidebarOpen(!this.sidebarOpen())
    }

    logout() : void {
      //this.userService.logout().subscribe()
    }


}
