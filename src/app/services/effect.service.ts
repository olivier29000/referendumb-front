import { Injectable } from '@angular/core';
import { StoreService } from './store.service';
import { catchError, map, Observable, of } from 'rxjs';
import { Router, UrlTree } from '@angular/router';
import { RepositoryService } from './repository.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class EffectService {

    constructor(private store :StoreService,
        private repository : RepositoryService,
        private router : Router
    ){}

    authentification(email : string, password : string):void{
        this.store.authentificationIsLoading.set(true)
        this.repository.authentification(email, password).subscribe(
          (userConnected) => {
            this.store.userConnected.set(userConnected)
            this.store.authentificationIsLoading.set(false)
            this.router.navigate(['']);
            this.store.errorMessage.set(''); 
          }, 
          ((error: string) => {
            this.store.authentificationIsLoading.set(false);  
            this.store.errorMessage.set(error); 
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: `${this.store.errorMessage()}`,
            });
            
          }));
      }

    creationCompte(email : string, password : string):void{
        this.store.creationCompteIsLoading.set(true)
        this.repository.creationCompte(email, password).subscribe(
          () => {
            this.store.creationCompteIsLoading.set(false)
            this.router.navigate(['']);
            Swal.fire({
              icon: "success",
              title: "Félicitation !",
              text: "Votre compte a été créé",
            });
          }, 
          ((error: string) => {
            this.store.creationCompteIsLoading.set(false);  
            this.store.errorMessage.set(error);  
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: `${this.store.errorMessage()}`,
            });
          }));
      }

    canActivate(): Observable<void | UrlTree> {
        return this.repository.verifAuthenticate().pipe(
            map((userConnected) => {
              this.store.userConnected.set(userConnected)
            }), 
            catchError((e) => {
              return of(this.router.parseUrl(`login`))}));
          }
}
