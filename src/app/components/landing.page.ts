import { Component, computed, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ServerService } from "./services/server.service";
import { AnalyticsService } from "./services/analytics.service";
import { Question } from "./models/question.model";
import { Choix } from "./models/choix.model";

@Component({
    template: `
        <div
            class="coming-soon-area"
            [style.background-image]="
                'url(assets/referendumb/landing-' + n + '.png)'
            "
            style="margin-bottom: 30px;"
        >
            <div class="d-table">
                <div class="d-table-cell">
                    <div class="coming-soon-content">
                        <img src="assets/referendumb-wbg.png" alt="image" />
                        <h2>Pronostiquez l'opinion des autres !</h2>
                        <br />
                        <h4>
                            Referendumb vous propose de répondre à une question
                            loufoque par jour et de pronostiquer sur les
                            réponses de la communauté
                        </h4>
                        <h4>Que le meilleur gagne !</h4>
                        <p class="mb-0 bt-3" style="margin-top: 40px;">
                            Date de sortie : 1er Mars
                        </p>
                        <div
                            id="timer"
                            class="flex-wrap d-flex justify-content-center"
                        >
                            <div
                                id="days"
                                class="align-items-center flex-column d-flex justify-content-center"
                            >
                                {{ days }} <span>Jours</span>
                            </div>
                            <div
                                id="hours"
                                class="align-items-center flex-column d-flex justify-content-center"
                            >
                                {{ hours }} <span>Heures</span>
                            </div>
                            <div
                                id="minutes"
                                class="align-items-center flex-column d-flex justify-content-center"
                            >
                                {{ minutes }} <span>Minutes</span>
                            </div>
                            <div
                                id="seconds"
                                class="align-items-center flex-column d-flex justify-content-center"
                            >
                                {{ seconds }} <span>Secondes</span>
                            </div>
                        </div>
                        <form class="newsletter-form">
                            <p class="my-3">
                                Laissez votre email pour rester informé et
                                peut-être jouer en avant-première !
                            </p>
                            <div class="form-group d-flex">
                                <input
                                    type="email"
                                    class="input-newsletter"
                                    placeholder="mon email"
                                    name="EMAIL"
                                    required
                                    autocomplete="off"
                                    [(ngModel)]="email"
                                />
                                <button
                                    type="submit"
                                    class="default-btn"
                                    (click)="inscriptionLandingPage()"
                                >
                                    <dumb-feather-icons
                                        [icon]="'send'"
                                    ></dumb-feather-icons>
                                </button>
                            </div>
                        </form>
                        <section class="matches-area py-3 my-3">
                            <div class="container">
                                @if(question(); as question){
                                <div class="single-matches-box">
                                    <div class="row align-items-center">
                                        <div class="col-md-12">
                                            <div
                                                class="matches-team"
                                                (click)="
                                                    selectReponse(
                                                        question,
                                                        question.choixList[0]
                                                    )
                                                "
                                            >
                                                <img
                                                    [src]="
                                                        question.choixList[0]
                                                            .image
                                                    "
                                                    class="wow animate__animated animate__fadeInLeft"
                                                    data-wow-delay="00ms"
                                                    data-wow-duration="1500ms"
                                                    alt="image"
                                                />

                                                <div class="content">
                                                    <h3>
                                                        <a
                                                            class="pt-1"
                                                            [ngClass]="
                                                                !question.reponse
                                                                    ? ''
                                                                    : question
                                                                          .reponse
                                                                          .choix
                                                                          .titre ===
                                                                      question
                                                                          .choixList[0]
                                                                          .titre
                                                                    ? 'div-selected'
                                                                    : 'div-barre'
                                                            "
                                                            >{{
                                                                question
                                                                    .choixList[0]
                                                                    .titre
                                                            }}</a
                                                        >
                                                    </h3>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="col-md-12">
                                            <div class="matches-result">
                                                <span class="date-time"
                                                    >{{ question.enonce }} ?
                                                </span>
                                            </div>
                                        </div>

                                        <div class="col-md-12">
                                            <div
                                                class="matches-team right-image"
                                                (click)="
                                                    selectReponse(
                                                        question,
                                                        question.choixList[1]
                                                    )
                                                "
                                            >
                                                <img
                                                    [src]="
                                                        question.choixList[1]
                                                            .image
                                                    "
                                                    class="wow animate__animated animate__fadeInRight"
                                                    data-wow-delay="00ms"
                                                    data-wow-duration="1500ms"
                                                    alt="image"
                                                />

                                                <div class="content">
                                                    <h3>
                                                        <a
                                                            class="pt-1"
                                                            [ngClass]="
                                                                !question.reponse
                                                                    ? ''
                                                                    : question
                                                                          .reponse
                                                                          .choix
                                                                          .titre ===
                                                                      question
                                                                          .choixList[1]
                                                                          .titre
                                                                    ? 'div-selected'
                                                                    : 'div-barre'
                                                            "
                                                            >{{
                                                                question
                                                                    .choixList[1]
                                                                    .titre
                                                            }}</a
                                                        >
                                                    </h3>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                @if(question.reponse){
                                <div class="col-12 text-center mb-3">
                                    <div class="volume-container">
                                        <span class="volume-icon">0</span>
                                        <input
                                            type="range"
                                            min="0"
                                            max="100"
                                            value="50"
                                            class="volume-slider"
                                            [(ngModel)]="
                                                question.reponse.pourcentage
                                            "
                                        />
                                        <span class="volume-icon">100</span>
                                    </div>

                                    <p style="color: white;">
                                        {{ question.reponse.pourcentage }} %
                                        pensent comme moi
                                    </p>
                                </div>
                                } }
                            </div>
                        </section>
                        <h4>
                            <a routerLink="/landing-more-page"
                                >Cliquez ici pour en savoir plus</a
                            >
                        </h4>
                    </div>
                </div>
            </div>
        </div>
    `,
    styleUrls: ["./landing.page.scss"],
})
export class LandingPage implements OnInit {
    constructor(
        private route: ActivatedRoute,
        private server: ServerService,
        private analyticsService: AnalyticsService
    ) {}

    selectReponse(question: Question, choix: Choix): void {
        this.server.selectReponse(question, choix);
    }
    nQuestion = this.getRandomNumber(0, this.server.questionList().length - 1);
    n: number;
    days: any;
    hours: any;
    minutes: any;
    seconds: any;
    myInterval: any;
    email = "";
    question = computed(() => this.server.questionList()[this.nQuestion]);
    commingSoonTime = () => {
        const endTimeParse = Date.parse("March 1, 2025 12:00:00 PDT") / 1000;
        const now = new Date();
        const nowParse = Date.parse(now.toString()) / 1000;
        const timeLeft = endTimeParse - nowParse;
        const days = Math.floor(timeLeft / 86400);
        let hours = Math.floor((timeLeft - days * 86400) / 3600);
        let minutes = Math.floor((timeLeft - days * 86400 - hours * 3600) / 60);
        let seconds = Math.floor(
            timeLeft - days * 86400 - hours * 3600 - minutes * 60
        );
        if (hours < 10) {
            hours = 0 + hours;
        }
        if (minutes < 10) {
            minutes = 0 + minutes;
        }
        if (seconds < 10) {
            seconds = 0 + seconds;
        }
        this.days = days;
        this.hours = hours;
        this.minutes = minutes;
        this.seconds = seconds;
    };
    inscriptionLandingPage(): void {
        this.server.inscriptionLandingPage(this.email);
    }
    ngOnInit(): void {
        this.n = this.getRandomNumber(1, 10);
        this.server.link.set(this.route.snapshot.paramMap.get("link") ?? "");
        this.myInterval = setInterval(() => {
            this.commingSoonTime();
        }, 0);
        this.analyticsService.sendAnalyticPageView(
            "/landing-page",
            "landing-page : " + this.n
        );
    }
    getRandomNumber(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}
