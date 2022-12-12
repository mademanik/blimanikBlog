import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { QuillModule } from "ngx-quill";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { ToastrModule } from "ngx-toastr";

import { CsvModule } from "@ctrl/ngx-csv";
import { TranslateModule } from "@ngx-translate/core";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";

import { CoreCommonModule } from "@core/common.module";
import { CardSnippetModule } from "@core/components/card-snippet/card-snippet.module";
import { ContentHeaderModule } from "app/layout/components/content-header/content-header.module";
import { Ng2FlatpickrModule } from "ng2-flatpickr";

import { AkunService } from "../_services/akun.service";
import { AkunDetailComponent } from "./akun-detail/akun-detail.component";

const routes: Routes = [
  {
    path: "akun-detail",
    component: AkunDetailComponent,
    data: { animation: "toastr" },
  },
];

@NgModule({
  declarations: [AkunDetailComponent],
  imports: [
    CommonModule,

    RouterModule.forChild(routes),
    BrowserModule,
    NgbModule,
    TranslateModule,
    CoreCommonModule,
    ContentHeaderModule,
    CardSnippetModule,
    ToastrModule,
    NgxDatatableModule,
    CsvModule,
    FormsModule,
    ReactiveFormsModule,
    CardSnippetModule,
    CoreCommonModule,
    QuillModule.forRoot(),
    Ng2FlatpickrModule,
  ],
  providers: [AkunService],
})
export class AkunModule {}
