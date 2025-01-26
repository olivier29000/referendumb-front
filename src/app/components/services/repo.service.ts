import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import {
    Injectable,
    WritableSignal,
    computed,
    effect,
    signal,
    untracked,
} from "@angular/core";
import { Question } from "../models/question.model";
import { catchError, Observable, throwError } from "rxjs";
import { environment } from "src/environments/environment";

const URL_BACKEND = environment.urlBackEnd;

@Injectable({
    providedIn: "root",
})
export class RepoService {
    constructor(private http: HttpClient) {}

    inscriptionLandingPage(
        email: string,
        questionList: Question[]
    ): Observable<void> {
        return this.http
            .post<void>(
                URL_BACKEND + "/user/inscription-landing-page/" + email,
                questionList
            )
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
