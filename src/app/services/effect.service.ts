import { Injectable } from "@angular/core";
import { StoreService } from "./store.service";
import { catchError, map, Observable, of } from "rxjs";
import { Router, UrlTree } from "@angular/router";
import { RepositoryService } from "./repository.service";
import Swal from "sweetalert2";
import { environment } from "src/environments/environment";

const URL_FRONT = environment.urlFront;
@Injectable({
  providedIn: "root",
})
export class EffectService {
  constructor(
    private store: StoreService,
    private repository: RepositoryService,
    private router: Router
  ) {}

  authentification(email: string, password: string): void {
    this.store.isLoading.set(true);
    this.repository.authentification(email, password).subscribe(
      (userConnected) => {
        this.store.userConnected.set(userConnected);
        this.store.isLoading.set(false);
        this.router.navigate(["home"]);
        this.store.errorMessage.set("");
      },
      (error: string) => {
        this.store.isLoading.set(false);
        this.store.errorMessage.set(error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${this.store.errorMessage()}`,
        });
      }
    );
  }

  logout(): void {
    this.store.isLoading.set(true);
    this.repository.logout().subscribe(
      () => {
        window.location.href = "";
      },
      () => {
        this.router.navigate([""]);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Erreur inconnu",
        });
      }
    );
  }

  oubliMotDePasse(email: string): void {
    this.store.isLoading.set(true);
    this.repository.oubliMotDePasse(email).subscribe(
      () => {
        this.store.isLoading.set(false);
        Swal.fire({
          icon: "success",
          title: "C'est noté",
          text: `Un email vient d'être envoyé à ${email} pour changer de mot de passe`,
        });
      },
      () => {
        this.store.isLoading.set(false);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `Une erreur s'est produite`,
        });
      }
    );
  }

  changementMotDePasse(
    token: string,
    password: string,
    passwordConfirm: string
  ): void {
    if (password === "" || passwordConfirm === "") {
      Swal.fire({
        icon: "info",
        title: "M'enfin",
        text: `Vous devez indiquer un mot de passe et le confirmer`,
      });
    } else if (password !== passwordConfirm) {
      Swal.fire({
        icon: "info",
        title: "Zut",
        text: `Le mot de passe et sa confirmation ne sont pas les même`,
      });
    } else {
      this.store.isLoading.set(true);
      this.repository.changementMotDePasse(token, password).subscribe(
        () => {
          this.store.isLoading.set(false);
          Swal.fire({
            icon: "success",
            title: "C'est bon",
            text: `Vous devriez pouvoir vous connecter avec votre nouveau mot de passe`,
          }).finally(() => (window.location.href = URL_FRONT));
        },
        () => {
          this.store.isLoading.set(false);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `Une erreur s'est produite`,
          });
        }
      );
    }
  }

  creationCompte(email: string, password: string): void {
    this.store.isLoading.set(true);
    this.repository.creationCompte(email, password).subscribe(
      () => {
        this.store.isLoading.set(false);
        this.router.navigate([""]);
        Swal.fire({
          icon: "success",
          title: "Félicitation !",
          text: "Votre compte a été créé",
        });
      },
      (error: string) => {
        this.store.isLoading.set(false);
        this.store.errorMessage.set(error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${this.store.errorMessage()}`,
        });
      }
    );
  }

  canActivate(): Observable<void | UrlTree> {
    return this.repository.verifAuthenticate().pipe(
      map((userConnected) => {
        this.store.userConnected.set(userConnected);
      }),
      catchError((e) => {
        return of(this.router.parseUrl(`login`));
      })
    );
  }
}
