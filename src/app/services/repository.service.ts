import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, tap, throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { UserConnected } from "../home/home-models/user-connected.model";
import { Router } from "@angular/router";

const URL_BACKEND = environment.urlBackEnd;
const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
  }),
  withCredentials: true,
};

@Injectable({
  providedIn: "root",
})
export class RepositoryService {
  constructor(private http: HttpClient, private router: Router) {}

  authentification(email: string, password: string): Observable<UserConnected> {
    return this.http
      .post<UserConnected>(
        URL_BACKEND + "/user/login",
        {
          email,
          password,
        },
        httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  creationCompte(email: string, password: string): Observable<void> {
    return this.http
      .post<void>(
        URL_BACKEND + "/user/creation-compte",
        {
          email,
          password,
        },
        httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  /**
   * permet de verifier si un utilisateur est connecté et de recuperer ses informations
   */
  verifAuthenticate(): Observable<UserConnected> {
    return this.http.get<UserConnected>(
      `${URL_BACKEND}/user/verifAuthenticate`,
      httpOptions
    );
  }

  logout(): Observable<void> {
    return this.http.get<void>(`${URL_BACKEND}/logout`, {
      withCredentials: true,
    });
  }

  oubliMotDePasse(email: string): Observable<void> {
    return this.http
      .get<void>(URL_BACKEND + "/user/oubli-mot-de-passe/" + email)
      .pipe(catchError(this.handleError));
  }

  changementMotDePasse(token: string, password: string): Observable<void> {
    return this.http
      .post<void>(URL_BACKEND + "/user/changement-mot-de-passe", {
        token,
        password,
      })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 409) {
      // Conflict: User already exists
      return throwError(error.error);
    }
    // Generic error handling
    return throwError("Une erreur inconnue s'est produite");
  }
}
