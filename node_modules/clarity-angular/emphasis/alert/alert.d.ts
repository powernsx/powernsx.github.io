import { EventEmitter } from "@angular/core";
import { AlertIconAndTypesService } from "./providers/icon-and-types-service";
export declare class Alert {
    iconService: AlertIconAndTypesService;
    constructor(iconService: AlertIconAndTypesService);
    isSmall: boolean;
    closable: boolean;
    isAppLevel: boolean;
    _closed: boolean;
    _closedChanged: EventEmitter<boolean>;
    alertType: string;
    alertIconShape: string;
    readonly alertClass: string;
    close(): void;
    open(): void;
}
