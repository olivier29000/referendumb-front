import { Injectable, WritableSignal, signal } from "@angular/core";

@Injectable({
    providedIn: "root",
})
export class StoreService {
    isLoading: WritableSignal<boolean> = signal(false);

    currentEmail: WritableSignal<string> = signal("");
    link: WritableSignal<string> = signal("");
    constructor() {}
}
