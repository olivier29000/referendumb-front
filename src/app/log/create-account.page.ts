import { Component, OnInit } from "@angular/core";
import { AnalyticsService } from "../services/analytics.service";
import { ServerService } from "../services/server.service";
import { Language } from "../models/language.model";

@Component({
  template: `
    <div class="page-wrapper">
      <div class="page-main-header row mx-0 ">
        <div class="nav col p-0 text-right">
          <ul class="header-menu ">
            <li
              class="profile-avatar notification-box onhover-dropdown text-center"
            >
              <div>
                <img
                  [src]="currentLanguage().imageUrl"
                  class="img-fluid"
                  alt=""
                />
              </div>
              <div class="notification-dropdown onhover-show-div">
                <div class="dropdown-title">
                  <h6>Available languages</h6>
                </div>
                <ul>
                  @for (language of availableLanguageList(); track language) {
                  <li (click)="selectLanguage(language)">
                    <img [src]="language.imageUrl" class="img-fluid" alt="" />
                  </li>
                  }
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="page-wrapper">
      <div class="authentication-box">
        <div class="container-fluid">
          <div class="row log-in">
            <div
              class="col-xxl-3 col-xl-4 col-lg-5 col-md-6 col-sm-8 form-login"
            >
              <div class="card">
                <div class="card-body">
                  <div class="title-3 text-start">
                    <h2>{{ "login.create-account" | translate }}</h2>
                  </div>
                  <form autocomplete="off">
                    <div class="form-group">
                      <div class="input-group">
                        <div class="input-group-prepend">
                          <div class="input-group-text">
                            <app-feather-icons
                              [icon]="'user'"
                            ></app-feather-icons>
                          </div>
                        </div>
                        <input
                          type="text"
                          class="form-control"
                          name="email"
                          [(ngModel)]="email"
                          [placeholder]="'login.enter-email' | translate"
                        />
                      </div>
                    </div>

                    <div class="form-group">
                      <div class="input-group">
                        <div class="input-group-prepend">
                          <div class="input-group-text">
                            <app-feather-icons
                              [icon]="'lock'"
                            ></app-feather-icons>
                          </div>
                        </div>
                        <input
                          [type]="passwordType"
                          name="password"
                          [(ngModel)]="password"
                          class="form-control"
                          [placeholder]="'login.enter-password' | translate"
                          autocomplete="off"
                        />
                        <div class="input-group-apend">
                          <div
                            class="input-group-text"
                            (click)="showPassword()"
                          >
                            <i
                              id="pwd-icon"
                              class="far"
                              [ngClass]="
                                passwordVisible == true
                                  ? 'fa-eye'
                                  : 'fa-eye-slash'
                              "
                            ></i>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="form-group">
                      <div class="input-group">
                        <div class="input-group-prepend">
                          <div class="input-group-text">
                            <app-feather-icons
                              [icon]="'lock'"
                            ></app-feather-icons>
                          </div>
                        </div>
                        <input
                          [type]="passwordType"
                          id="pwd-input"
                          name="passwordConfirmation"
                          [(ngModel)]="passwordConfirmation"
                          class="form-control"
                          [placeholder]="'login.confirm-password' | translate"
                          autocomplete="off"
                          maxlength="8"
                        />
                        <div class="input-group-apend">
                          <div
                            class="input-group-text"
                            (click)="showPassword()"
                          >
                            <i
                              id="pwd-icon"
                              class="far"
                              [ngClass]="
                                passwordVisible == true
                                  ? 'fa-eye'
                                  : 'fa-eye-slash'
                              "
                            ></i>
                          </div>
                        </div>
                      </div>
                      <div class="important-note">
                        {{ "login.password-security" | translate }}
                      </div>
                    </div>
                    <div class="w-100 d-flex justify-content-center">
                      <a
                        [routerLink]="['/login']"
                        class="font-rubik text-color-2"
                        >{{ "login.already-have-account" | translate }}</a
                      >
                    </div>
                    <div class="w-100 d-flex justify-content-center">
                      <button
                        [disabled]="
                          !email ||
                          !password ||
                          password !== passwordConfirmation
                        "
                        (click)="creationCompte()"
                        type="button"
                        class="btn btn-gradient btn-pill color-2 me-sm-3 me-2"
                      >
                        {{ "login.create-my-account" | translate }}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div
              class="col-xxl-7 col-xl-7 offset-xxl-1 col-lg-6 auth-img bg-size-login"
              [style.background-image]="'url(assets/images/svg/2.jpg)'"
            >
              <img
                src="assets/images/svg/2.jpg"
                class="bg-img"
                alt=""
                style="display: none;"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .page-main-header {
        width: 100%;
      }
    `,
  ],
})
export class CreateAccountComponent implements OnInit {
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

  ngOnInit(): void {}

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
