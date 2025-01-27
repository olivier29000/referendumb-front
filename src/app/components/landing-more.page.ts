import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Question } from "./models/question.model";
import { Choix } from "./models/choix.model";
import { AnalyticsService } from "./services/analytics.service";
import { ServerService } from "./services/server.service";
import Swal from "sweetalert2";

@Component({
    template: `
        <div class="main-banner jarallax" data-jarallax='{"speed": 0.3}'>
            <div class="container">
                <div class="main-banner-content">
                    <span
                        class="sub-title wow animate__animated animate__fadeInLeft"
                        data-wow-delay="00ms"
                        data-wow-duration="1000ms"
                        >Pronostiquez sur l'opinion de la communauté !</span
                    >
                    <div
                        class="logo wow animate__animated animate__fadeInUp"
                        data-wow-delay="00ms"
                        data-wow-duration="1000ms"
                    >
                        <img src="assets/referendumb-wbg.png" alt="image" />
                    </div>
                    <h6
                        class="wow animate__animated animate__fadeInRight"
                        data-wow-delay="00ms"
                        data-wow-duration="1000ms"
                    >
                        Disponible le 1er avril
                    </h6>
                    @if(emailGiven()){
                    <h6
                        class="wow animate__animated animate__fadeInRight"
                        data-wow-delay="00ms"
                        data-wow-duration="1000ms"
                    >
                        On vient de vous envoyer un email
                    </h6>
                    }@else {
                    <div
                        class="btn-box wow animate__animated animate__fadeInUp"
                        data-wow-delay="00ms"
                        data-wow-duration="1000ms"
                    >
                        <form class="newsletter-form">
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
                    </div>
                    }
                </div>
            </div>
        </div>

        <section class="faq-area">
            <div class="container">
                <div class="tab faq-accordion-tab">
                    <div class="tab-content">
                        <div class="tabs-item">
                            <div class="row">
                                <div class="col-lg-12 col-md-12">
                                    <div class="faq-item">
                                        <h3>
                                            Il y a des questions sans intérêt :
                                        </h3>
                                        <p>
                                            les chiens sont-ils plus gentils que
                                            les les chats ? ça se fait de mettre
                                            de l'ananas sur une pizza ? Beurre
                                            salé ou beurre doux ?..
                                        </p>
                                    </div>
                                </div>

                                <div class="col-lg-12 col-md-12">
                                    <div class="faq-item">
                                        <h3>
                                            Des réponses qui nous paraissent
                                            évidentes :
                                        </h3>
                                        <p>
                                            Ira t'on sur Mars un jour ? Les
                                            kebabs sont-ils bons pour la santé ?
                                            Léonardo Dicaprio finira t'il avec
                                            quelqu'un de son age ?..
                                        </p>
                                    </div>
                                </div>

                                <div class="col-lg-12 col-md-12">
                                    <div class="faq-item">
                                        <h3>
                                            Et des sujets sur lesquels ça nous
                                            parait impossible de nous
                                            positionner :
                                        </h3>
                                        <p>
                                            est-ce que l'avenir sera plus beau
                                            que le présent ? Le bitcoin est-il
                                            une arnaque ? Xavier Dupont de
                                            Ligones est-il vivant ? ..
                                        </p>
                                    </div>
                                </div>
                                <div class="col-lg-12 col-md-12">
                                    <div class="faq-item">
                                        <h3>
                                            Mais est-ce que tout le monde pense
                                            pareil ?
                                        </h3>
                                        <p>
                                            Est-ce que notre contexte sociale ne
                                            nous pousserait pas à penser que les
                                            autres ont les même opinions ?
                                        </p>
                                        <p>
                                            A quel point sommes nous conscients
                                            des points de vues autour de nous ?
                                            Pourrions nous être surpris ?.. si
                                            nous savions...
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <div class="main-banner jarallax pt-3" data-jarallax='{"speed": 0.3}'>
            <div class="container">
                <div class="main-banner-content">
                    <h6
                        class="wow animate__animated animate__fadeInRight"
                        data-wow-delay="00ms"
                        data-wow-duration="1000ms"
                    >
                        Referendumb vous propose de vous divertir avec ce
                        concept.
                    </h6>
                </div>
            </div>
        </div>
        <section class="faq-area">
            <div class="container">
                <div class="tab faq-accordion-tab">
                    <div class="tab-content">
                        <div class="tabs-item">
                            <div class="row">
                                <div class="col-lg-12 col-md-12">
                                    <div class="faq-item">
                                        <p>
                                            L'appli, qui pourra être installée
                                            sur téléphone ou se jouer sur le
                                            web, vous enverra tous les jours une
                                            question sur laquelle vous devrez
                                            vous positionner. Vous devrez
                                            ensuite deviner la proportion de la
                                            communauté qui sera du même avis. La
                                            moyenne de vos résultats déterminera
                                            votre classement et vous permettra
                                            d'atteindre, ou pas, le podium de
                                            Referendumb.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="matches-area ptb-100 pt-3">
            <div class="container">
                <div class="section-title">
                    <h2>Vous voulez jouer ?</h2>
                </div>
                @for (question of questionList; track $index) {
                <div class="single-matches-box">
                    <div class="row align-items-center">
                        <div class="col-lg-5 col-md-12">
                            <div class="matches-team">
                                <img
                                    [src]="question.choixList[0].image"
                                    class="wow animate__animated animate__fadeInLeft"
                                    data-wow-delay="00ms"
                                    data-wow-duration="1500ms"
                                    alt="image"
                                />

                                <div
                                    class="content"
                                    (click)="
                                        selectReponse(
                                            question,
                                            question.choixList[0]
                                        )
                                    "
                                >
                                    <h3>
                                        <a
                                            class="pt-1"
                                            [ngClass]="
                                                !question.reponse
                                                    ? ''
                                                    : question.reponse.choix
                                                          .titre ===
                                                      question.choixList[0]
                                                          .titre
                                                    ? 'div-selected'
                                                    : 'div-barre'
                                            "
                                            >{{
                                                question.choixList[0].titre
                                            }}</a
                                        >
                                    </h3>
                                </div>
                            </div>
                        </div>

                        <div class="col-lg-2 col-md-12">
                            <div class="matches-result">
                                <span class="date-time"
                                    >{{ question.enonce }} ?
                                </span>
                            </div>
                        </div>

                        <div class="col-lg-5 col-md-12">
                            <div class="matches-team right-image">
                                <img
                                    [src]="question.choixList[1].image"
                                    class="wow animate__animated animate__fadeInRight"
                                    data-wow-delay="00ms"
                                    data-wow-duration="1500ms"
                                    alt="image"
                                />

                                <div
                                    class="content"
                                    (click)="
                                        selectReponse(
                                            question,
                                            question.choixList[1]
                                        )
                                    "
                                >
                                    <h3>
                                        <a
                                            class="pt-1"
                                            [ngClass]="
                                                !question.reponse
                                                    ? ''
                                                    : question.reponse.choix
                                                          .titre ===
                                                      question.choixList[1]
                                                          .titre
                                                    ? 'div-selected'
                                                    : 'div-barre'
                                            "
                                            >{{
                                                question.choixList[1].titre
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
                            [(ngModel)]="question.reponse.pourcentage"
                        />
                        <span class="volume-icon">100</span>
                    </div>

                    <p style="color: black;">
                        {{ question.reponse.pourcentage }} % pensent comme moi
                    </p>
                </div>
                } }

                <div class="row">
                    <div class="col text-center">
                        <button
                            type="submit"
                            class="default-btn"
                            (click)="inscriptionLandingPage()"
                        >
                            @if(emailGiven()){ Valider mes réponses }@else {
                            Recevoir les résultats }
                        </button>
                        @if(emailGiven()){
                        <div class="section-title">
                            <h2>On a hâte de vous voir sur l'appli</h2>
                        </div>
                        }
                    </div>
                </div>
            </div>
        </section>

        <section class="subscribe-area">
            <div class="container">
                <div
                    class="subscribe-inner ptb-100 jarallax"
                    data-jarallax='{"speed": 0.3}'
                ></div>
            </div>
        </section>
    `,
    styleUrls: ["./landing-more.page.scss"],
})
export class LandingMorePage implements OnInit {
    constructor(
        private route: ActivatedRoute,
        private server: ServerService,
        private analyticsService: AnalyticsService
    ) {}
    email = "";
    emailGiven = this.server.emailGiven;

    questionList: Question[] = [
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

    async inscriptionLandingPage(): Promise<void> {
        if (this.email === "") {
            const { value: email } = await Swal.fire({
                title: "Quelle est votre adresse email",
                input: "email",
                inputLabel: "recevoir mes réponses",
                inputPlaceholder: "Valider",
            });
            if (email) {
                this.email = email;
                this.server.inscriptionLandingPage(email, this.questionList);
            }
        } else {
            this.server.inscriptionLandingPage(this.email, this.questionList);
        }
    }

    selectReponse(question: Question, choix: Choix): void {
        question.reponse = {
            choix,
            pourcentage: 50,
        };
        this.analyticsService.sendAnalyticEvent(
            "selectReponse",
            choix.titre,
            "/landing-more-page"
        );
    }

    ngOnInit(): void {
        this.analyticsService.sendAnalyticPageView(
            "/landing-more-page",
            "landing-more-page : " + this.server.link()
        );
    }
}
