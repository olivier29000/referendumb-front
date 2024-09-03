import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home.page';
import { MenuSmartComponent } from './home-smarts/menu.smart';
import { LogoDumbComponent } from './home-dumbs/logo.dumb';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { HomeRoutingModule } from './home-routing.module';
import { HeaderSmartComponent } from './home-smarts/header.smart';

@NgModule({
  declarations: [
    HomePageComponent,
    MenuSmartComponent,
    LogoDumbComponent,
    HeaderSmartComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    RouterModule
  ],
  exports: [
  ],
  providers:[]
})
export class HomeModule { }
