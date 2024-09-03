import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RhRoutingModule } from './rh-routing.module';
import { RhPageComponent } from './rh.page';

@NgModule({
  declarations: [
    RhPageComponent
  ],
  imports: [
    CommonModule,
    RhRoutingModule,
    RouterModule
  ],
  exports: [
  ],
  providers:[]
})
export class RhModule { }
