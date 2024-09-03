import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomePageComponent } from './home.page';


const routes: Routes = [
  {
    path : '',
    component : HomePageComponent,
    children : [
        {
            path: 'rh',
            loadChildren: () => import('./rh/rh.module').then(m => m.RhModule)
          }
    ]
  },
  
//   {
//     path: 'paralympiques',
//     loadChildren: () => import('./paralympique/paralympique.module').then(m => m.ParalympiqueModule)
//   }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
