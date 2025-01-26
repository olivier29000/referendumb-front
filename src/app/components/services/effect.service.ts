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

    inscriptionLandingPage(email: string, questionList: Question[]): void {
        this.repo
            .inscriptionLandingPage(
                email,
                this.store.link() === "" ? "null" : this.store.link(),
                questionList.filter((q) => q.reponse)
            )
            .subscribe(() => {
                this.store.emailGiven.set(true);
                Swal.fire({
                    icon: "success",
                    title: "Merci :)",
                    text: "On vient de t'envoyer un email pour confirmer",
                });
            });
    }
}
