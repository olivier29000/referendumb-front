import { inject, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './shared/components/layouts/layout/layout.component';
import { content } from './shared/routes/routes';
import { FullLayoutComponent } from './shared/components/layouts/full-layout/full-layout.component';
import { fullContent } from './shared/routes/full-routes';
import { LoginComponent } from './log/login.page';
import { CreateAccountComponent } from './log/create-account.page';
import { EffectService } from './services/effect.service';

const routes: Routes = [
     {path: 'login',      component: LoginComponent},
     {path: 'create-account',      component: CreateAccountComponent},
   {
    path: '',
    canActivate: [() => inject(EffectService).canActivate()],
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  },
  {
    path : '**',
    redirectTo : '',
  }

];


// const routes: Routes = [
//   {path: ':language?/login',      component: LoginComponent},
//   // {path: ':language?/proyectos',   component: ArchiveComponent},
  
//   // {path: 'profile'        ,   component: ProfileComponent         , canActivate: [AuthGuard]},
//   // {path: 'users'          ,   component: UsersComponent           , canActivate: [AuthGuard]},
//   // {path: 'register-user'  ,   component: RegisterUserComponent    , canActivate: [AuthGuard]},

//   {path: '**', pathMatch: 'full', redirectTo: '/'},


// ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
