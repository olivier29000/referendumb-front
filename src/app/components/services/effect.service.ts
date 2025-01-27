import {
    Injectable,
    WritableSignal,
    computed,
    effect,
    signal,
    untracked,
} from "@angular/core";
import { RepoService } from "./repo.service";
import { Question } from "../models/question.model";
import { StoreService } from "./store.service";
import Swal from "sweetalert2";

@Injectable({
    providedIn: "root",
})
export class EffectService {
    constructor(private repo: RepoService, private store: StoreService) {}

    inscriptionLandingPageAvecQuestions(
        email: string,
        questionList: Question[]
    ): void {
        this.store.isLoading.set(true);
        this.repo
            .inscriptionLandingPageAvecQuestions(
                email,
                this.store.link() === "" ? "null" : this.store.link(),
                questionList.filter((q) => q.reponse)
            )
            .subscribe(
                () => {
                    this.store.emailGiven.set(true);
                    Swal.fire({
                        icon: "success",
                        title: "Merci :)",
                        text: "Tu recevras tes réponses très bientôt",
                    });
                    this.store.emailGiven.set(true);
                    this.store.isLoading.set(false);
                },
                () => {
                    this.store.isLoading.set(false);
                }
            );
    }

    inscriptionLandingPage(email: string): void {
        this.store.isLoading.set(true);
        this.repo
            .inscriptionLandingPage(
                email,
                this.store.link() === "" ? "null" : this.store.link()
            )
            .subscribe(
                () => {
                    this.store.emailGiven.set(true);
                    Swal.fire({
                        icon: "success",
                        title: "Merci :)",
                        text: "On vient de t'envoyer un email pour confirmer",
                    });
                    this.store.emailGiven.set(true);
                    this.store.isLoading.set(false);
                },
                () => {
                    this.store.isLoading.set(false);
                }
            );
    }
}
