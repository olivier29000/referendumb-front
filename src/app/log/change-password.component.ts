import { Component, inject, Input, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ServerService } from "../services/server.service";

@Component({
  selector: "app-change-password",
  template: `
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
                    <h2>Changer mon mot de passe</h2>
                  </div>
                  <form autocomplete="off">
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
                          [type]="inputTypePassword"
                          id="pwd-input"
                          class="form-control"
                          placeholder="Mot de passe"
                          autocomplete="off"
                          [(ngModel)]="password"
                          name="password"
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
                                isShowPassword == true
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
                          [type]="inputTypePasswordConfirm"
                          id="pwd-input"
                          class="form-control"
                          placeholder="Confirmer le mot de passe"
                          autocomplete="off"
                          [(ngModel)]="passwordConfirm"
                          name="password"
                        />
                        <div class="input-group-apend">
                          <div
                            class="input-group-text"
                            (click)="showPasswordConfirm()"
                          >
                            <i
                              id="pwd-icon"
                              class="far"
                              [ngClass]="
                                isShowPasswordConfirm == true
                                  ? 'fa-eye'
                                  : 'fa-eye-slash'
                              "
                            ></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>

                  <div class="text-center mt-3">
                    <a
                      (click)="changePassword()"
                      class="btn btn-gradient btn-pill color-2 me-sm-3 me-2"
                      >Valider</a
                    >
                  </div>
                </div>
              </div>
            </div>
            <div
              class="col-xxl-7 col-xl-7 offset-xxl-1 col-lg-6 auth-img bg-size-login"
              [style.background-image]="
                'url(assets/_images_pourdubeurre/logopdb.png)'
              "
            >
              <img
                src="assets/_images_pourdubeurre/logopdb.png"
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
})
export class ChangePasswordPage implements OnInit {
  token: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Récupérer le paramètre 'token' de l'URL
    this.token = this.route.snapshot.paramMap.get("token") ?? "";
  }

  private serverService = inject(ServerService);

  password: string = "";
  inputTypePassword = "password";
  isShowPassword = false;

  passwordConfirm = "";
  inputTypePasswordConfirm = "password";
  isShowPasswordConfirm = false;

  errorMessage = this.serverService.errorMessage;

  showPassword() {
    this.isShowPassword = !this.isShowPassword;
    if (this.isShowPassword) {
      this.inputTypePassword = "text";
    } else {
      this.inputTypePassword = "password";
    }
  }

  showPasswordConfirm() {
    this.isShowPasswordConfirm = !this.isShowPasswordConfirm;
    if (this.isShowPasswordConfirm) {
      this.inputTypePasswordConfirm = "text";
    } else {
      this.inputTypePasswordConfirm = "password";
    }
  }

  changePassword() {
    this.serverService.changementMotDePasse(
      this.token,
      this.password,
      this.passwordConfirm
    );
  }

  isLoading = this.serverService.isLoading;
}
