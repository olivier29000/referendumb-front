import {
    Injectable,
    WritableSignal,
    computed,
    effect,
    signal,
    untracked,
} from "@angular/core";
import { EffectService } from "./effect.service";
import { StoreService } from "./store.service";
import { Question } from "../models/question.model";

@Injectable({
    providedIn: "root",
})
export class ServerService {
    constructor(
        private effectService: EffectService,
        private store: StoreService
    ) {}
    isLoading = this.store.isLoading;
    emailGiven = this.store.emailGiven;
    link = this.store.link;
    currentEmail = this.store.currentEmail;

    inscriptionLandingPage(email: string): void {
        this.effectService.inscriptionLandingPage(email);
    }

    inscriptionLandingPageAvecQuestions(
        email: string,
        questionList: Question[]
    ): void {
        this.effectService.inscriptionLandingPageAvecQuestions(
            email,
            questionList
        );
    }
}
