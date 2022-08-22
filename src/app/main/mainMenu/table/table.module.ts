import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { QuillModule } from "ngx-quill";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { CoreCommonModule } from "@core/common.module";
import { CardSnippetModule } from "@core/components/card-snippet/card-snippet.module";
import { ContentHeaderModule } from "app/layout/components/content-header/content-header.module";

import { TableComponent } from "./table.component";

const routes: Routes = [
  {
    path: "addBlog",
    component: TableComponent,
    data: { animation: "table" },
  },
  {
    path: "editBlog/:id",
    component: TableComponent,
    data: { animation: "table" },
  },
];

@NgModule({
  declarations: [TableComponent],
  imports: [
    RouterModule.forChild(routes),
    BrowserModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    ContentHeaderModule,
    CardSnippetModule,
    CoreCommonModule,
    QuillModule.forRoot(),
  ],
})
export class TableModule {}
