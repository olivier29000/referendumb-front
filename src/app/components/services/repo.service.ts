import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Question } from "../models/question.model";
import { catchError, Observable, throwError } from "rxjs";
import { environment } from "src/environments/environment";
import Swal from "sweetalert2";

const URL_BACKEND = environment.urlBackEnd;

@Injectable({
    providedIn: "root",
})
export class RepoService {
    constructor(private http: HttpClient) {}

    inscriptionLandingPageAvecQuestions(
        email: string,
        link: string,
        questionList: Question[]
    ): Observable<void> {
        return this.http
            .post<void>(
                `${URL_BACKEND}/user/inscription-landing-page/${email}/${link}`,
                questionList
            )
            .pipe(catchError(this.handleError));
    }

    inscriptionLandingPage(email: string, link: string): Observable<void> {
        return this.http
            .get<void>(
                `${URL_BACKEND}/user/inscription-landing-page/${email}/${link}`
            )
            .pipe(catchError(this.handleError));
    }

    private handleError(error: HttpErrorResponse) {
        console.log(error);
        Swal.fire({
            icon: "info",
            title: "Oops...",
            text: error.error,
        });
        if (error.status === 409) {
            // Conflict: User already exists
            return throwError(error.error);
        }

        // Generic error handling
        return throwError("Une erreur inconnue s'est produite");
    }
}
