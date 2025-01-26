import { Choix } from "./choix.model";
import { Reponse } from "./reponse.model";

export interface Question {
    id: number;
    enonce: string;
    choixList: Choix[];
    reponse?: Reponse;
}
