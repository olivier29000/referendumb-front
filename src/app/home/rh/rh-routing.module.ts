import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RhPageComponent } from './rh.page';



const routes: Routes = [
  {
    path : '',
    component : RhPageComponent
    
  }
//   {
//     path: 'paralympiques',
//     loadChildren: () => import('./paralympique/paralympique.module').then(m => m.ParalympiqueModule)
//   }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RhRoutingModule { }
