import { Injectable, WritableSignal, signal } from "@angular/core";
import { Question } from "../models/question.model";

@Injectable({
    providedIn: "root",
})
export class StoreService {
    isLoading: WritableSignal<boolean> = signal(false);

    currentEmail: WritableSignal<string> = signal("");
    link: WritableSignal<string> = signal("");
    emailGiven: WritableSignal<boolean> = signal(false);
    questionList: WritableSignal<Question[]> = signal(questionList);
    constructor() {}
}
export const questionList: Question[] = [
    {
        id: 1,
        enonce: "Chien ou chat",
        choixList: [
            {
                id: 1,
                titre: "chien",
                image: "assets/referendumb/chien.png",
            },
            {
                id: 2,
                titre: "chat",
                image: "assets/referendumb/chat.png",
            },
        ],
    },
    {
        id: 2,
        enonce: "Tu préfères te défendre contre 100 canards ou 1 cheval",
        choixList: [
            {
                id: 3,
                titre: "100 canards",
                image: "assets/referendumb/canard.png",
            },
            {
                id: 4,
                titre: "1 Cheval",
                image: "assets/referendumb/cheval.png",
            },
        ],
    },
    {
        id: 3,
        enonce: "Le beurre se range au frigo ou dehors",
        choixList: [
            {
                id: 5,
                titre: "Dans le frigo",
                image: "assets/referendumb/beurrefroid.png",
            },
            {
                id: 6,
                titre: "Hors du frigo",
                image: "assets/referendumb/beurrechaud.png",
            },
        ],
    },
    {
        id: 4,
        enonce: "C'est bon la pizza à l'ananas",
        choixList: [
            {
                id: 7,
                titre: "oui",
                image: "assets/referendumb/pizzaavecananas.png",
            },
            {
                id: 8,
                titre: "non",
                image: "assets/referendumb/pizzasansananas.png",
            },
        ],
    },
    {
        id: 5,
        enonce: "Leonardo Dicaprio resortira, un jour, avec une femme de son âge",
        choixList: [
            {
                id: 9,
                titre: "non",
                image: "assets/referendumb/leom.png",
            },
            {
                id: 10,
                titre: "oui",
                image: "assets/referendumb/leoh.png",
            },
        ],
    },
    {
        id: 6,
        enonce: "Xavier Dupont de Ligones est vivant ou mort ?",
        choixList: [
            {
                id: 11,
                titre: "vivant",
                image: "assets/referendumb/xavierh.png",
            },
            {
                id: 12,
                titre: "mort",
                image: "assets/referendumb/xavierm.png",
            },
        ],
    },
];
