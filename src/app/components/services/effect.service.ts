import {
    Injectable,
    WritableSignal,
    computed,
    effect,
    signal,
    untracked,
} from "@angular/core";
import { RepoService } from "./repo.service";

@Injectable({
    providedIn: "root",
})
export class EffectService {
    constructor(private repo: RepoService) {}
}
