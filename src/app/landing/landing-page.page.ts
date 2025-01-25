import { Component, OnInit } from "@angular/core";
import { AnalyticsService } from "../services/analytics.service";
import { ServerService } from "../services/server.service";
import { Language } from "../models/language.model";

@Component({
  template: `
    <div class="page-wrapper">
      <div class="authentication-box">
        <div class="container-fluid">
          <div class="row log-in">
            <div
              class="col-xxl-4 col-xl-5 col-lg-6 col-md-7 col-sm-9 form-login"
            >
              <div class="card">
                <div class="card-body">
                  <div class="title-3 text-center">
                    <img
                      src="assets/logo.png"
                      alt=""
                      class="img-fluid"
                      style="width : 30%;"
                    />
                    <h2>Referendumb</h2>
                    <h6 class="mt-3">
                      Pronostiquez sur l'opinion de la communauté !
                    </h6>
                  </div>
                  <div>
                    <p>
                      <span class="p color"
                        >Certaines questions nous paraissent nous rapprochent
                        :</span
                      >
                      les chiens sont-ils plus gentils que les les chats ? ça se
                      fait de mettre de l'ananas sur une pizza ? Beurre salé ou
                      beurre doux ?..
                    </p>
                    <p>
                      <span class="p color"
                        >Certaines réponses nous paraissent évidentes :</span
                      >
                      Ira t'on sur Mars un jour ? Les kebabs sont-ils bons pour
                      la santé ? Léonardo Dicaprio finira t'il avec quelqu'un de
                      son age ?..
                    </p>
                    <p>
                      <span class="p color"
                        >Et parfois ça nous parait impossible de nous
                        positionner :</span
                      >

                      est-ce que l'avenir sera plus beau que le présent ? Le
                      bitcoin est-il une arnaque ? Xavier Dupont de Ligones
                      est-il vivant ? ..
                    </p>
                    <p>
                      Mais est-ce que notre contexte sociale ne nous pousserait
                      pas à penser que les autres ont les même opinions ? A quel
                      point sommes nous conscients des points de vues des autres
                      ?
                    </p>
                    <h6>
                      <span class="h6 color"
                        >Referendumb vous propose de vous divertir</span
                      >
                      avec ce concept.
                    </h6>
                    <p>
                      Je développe une appli qui vous enverra tous les jours une
                      question sur laquelle vous devrez vous positionner et
                      estimer la proportion de la communauté qui sera du même
                      avis.
                    </p>
                    <p>
                      La moyenne de vos résultats déterminera votre classement
                      et vous permettra d'atteindre, ou pas, le podium de
                      Refrendumb.
                    </p>
                  </div>
                  <form autocomplete="off">
                    <div class="w-100 d-flex justify-content-center">
                      <p class="p color">On vous tient au courant ?</p>
                    </div>
                    <div class="form-group">
                      <div class="input-group">
                        <div class="input-group-prepend">
                          <div class="input-group-text">
                            <app-feather-icons
                              [icon]="'mail'"
                            ></app-feather-icons>
                          </div>
                        </div>
                        <input
                          type="text"
                          class="form-control"
                          name="email"
                          [(ngModel)]="email"
                          placeholder="Laisse ton email, ça n'engage à rien"
                        />
                        <button
                          (click)="creationCompte()"
                          type="button"
                          class="btn btn-gradient color-2 me-sm-3 me-2"
                        >
                          <app-feather-icons
                            [icon]="'send'"
                          ></app-feather-icons>
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            @if(n){
            <div
              class="col-xxl-6 col-xl-6 offset-xxl-1 col-lg-5 auth-img bg-size-login"
              [style.background-image]="
                'url(assets/landing/landing-' + n + '.png)'
              "
            >
              <img
                [src]="'assets/landing/landing-' + n + '.png'"
                class="bg-img"
                alt=""
                style="display: none;"
              />
              <small class="ia px-3">Image générée avec de l'IA</small>
            </div>
            }
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .ia {
        position: absolute;
        top: 0;
        right: 0;
        background-color: white;
      }
      .page-main-header {
        width: 100%;
      }
      p {
        font-size: 16px;
      }
      .p {
        font-size: 16px;
      }
      .h6 {
        font-size: 18px;
      }
      h6 {
        font-size: 18px;
      }
      h2 {
        font-size: 36px;
      }
      .color {
        color: var(--theme-default4) !important;
      }
    `,
  ],
})
export class LandingPage implements OnInit {
  passwordType = "password";
  passwordVisible = false;

  email = "";
  password = "";
  passwordConfirmation = "";

  currentLanguage = this.serverService.currentLanguage;
  availableLanguageList = this.serverService.availableLanguageList;

  constructor(
    public analyticsService: AnalyticsService,
    private serverService: ServerService
  ) {}
  n: number;

  ngOnInit(): void {
    this.n = this.getRandomNumber(1, 4);
    console.log(this.n);
  }
  getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  selectLanguage(language: Language): void {
    this.serverService.selectLanguage(language);
  }

  creationCompte(): void {
    this.serverService.creationCompte(this.email, this.password);
  }

  showPassword() {
    this.passwordVisible = !this.passwordVisible;
    if (this.passwordVisible) {
      this.passwordType = "text";
    } else {
      this.passwordType = "password";
    }
  }
}
