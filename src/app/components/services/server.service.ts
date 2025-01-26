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

@Injectable({
    providedIn: "root",
})
export class ServerService {
    constructor(
        private effectService: EffectService,
        private store: StoreService
    ) {}

    link = this.store.link;
    currentEmail = this.store.currentEmail;
}
