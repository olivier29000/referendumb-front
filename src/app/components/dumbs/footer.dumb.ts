import { Component } from "@angular/core";

@Component({
    selector: "dumb-footer",
    template: `<div class="container-fluid fixed-bottom">
        <div class="row">
            <div class="col-12">
                <p class="float-end mb-0">
                    développé par
                    <a href="https://www.alaisedev.fr/" target="_blank"
                        >alaisedev.fr</a
                    >
                </p>
            </div>
        </div>
    </div>`,
    styles: [
        `
            p {
                color: black !important;
            }
            a {
                color: blue !important;
            }
            .fixed-bottom {
                position: fixed;
                bottom: 0;
                left: 0;
                width: 100%; /* S'étend sur toute la largeur de la page */
                z-index: 1000; /* Assure que le composant reste au-dessus des autres éléments */
                background-color: #fff; /* Couleur de fond (personnalise si nécessaire) */
                box-shadow: 0px -2px 5px rgba(0, 0, 0, 0.1); /* Ajoute une ombre pour démarquer le composant */
                padding: 10px; /* Espacement interne */
            }
        `,
    ],
})
export class FooterDumb {}
