import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { CsvModule } from "@ctrl/ngx-csv";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";

import { CoreCommonModule } from "@core/common.module";
import { CardSnippetModule } from "@core/components/card-snippet/card-snippet.module";

import { ContentHeaderModule } from "app/layout/components/content-header/content-header.module";

import { HomeComponent } from "./home/home.component";

import { TableModule } from './table/table.module';
import { DatatablesModule } from './datatables/datatables.module';

const routes = [
  {
    path: "home",
    component: HomeComponent,
    data: { animation: "home" },
  }
];

@NgModule({
  declarations: [HomeComponent],
  imports: [
    RouterModule.forChild(routes),
    ContentHeaderModule,
    TranslateModule,
    CoreCommonModule,
    NgbModule,
    CardSnippetModule,
    NgxDatatableModule,
    CsvModule,
    TableModule,
    DatatablesModule
  ],
  exports: [HomeComponent],
})
export class MainMenuModule {}
