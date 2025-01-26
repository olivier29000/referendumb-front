import { Component, Input } from "@angular/core";
import * as feather from "feather-icons";

@Component({
    selector: "dumb-feather-icons",
    template: `<i class="{{ class }}" [attr.data-feather]="icon"></i>`,
})
export class FeatherIconsDumb {
    @Input("icon") public icon: string | undefined;
    @Input() class: string;

    constructor() {}

    ngAfterViewInit() {
        feather.replace();
    }
}
