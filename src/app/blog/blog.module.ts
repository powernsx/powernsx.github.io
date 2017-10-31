import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {ClarityModule} from "clarity-angular";

import {UtilsModule} from "../utils/utils.module";
import {BlogComponent} from "./blog.component";
import {RouterModule, Routes} from "@angular/router";

const route: Routes = [
    {
        path: "",
        component: BlogComponent,
        data: {
            bodyClass: "layout-get-started",
            browserTitle: "blog"
        }
    }
];

@NgModule({
    declarations: [
        BlogComponent,
    ],
    imports: [
        CommonModule,
        ClarityModule.forChild(),
        UtilsModule,
        RouterModule.forChild(route)
    ],
    providers: []
})
export class BlogModule {
}
