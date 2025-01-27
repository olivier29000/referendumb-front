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
import { Choix } from "../models/choix.model";

@Injectable({
    providedIn: "root",
})
export class EffectService {
    constructor(private repo: RepoService, private store: StoreService) {}
    selectReponse(question: Question, choix: Choix): void {
        this.store.questionList.update((questionList) => {
            return questionList.map((q) => {
                if (q.id === question.id) {
                    return {
                        ...q,
                        reponse: {
                            choix,
                            pourcentage: 50,
                        },
                    };
                } else {
                    return q;
                }
            });
        });
    }
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
